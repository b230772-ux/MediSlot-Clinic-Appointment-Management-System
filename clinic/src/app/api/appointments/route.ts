import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET - List appointments with search + pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { patient: { name: { contains: search } } },
            { doctor: { name: { contains: search } } },
          ],
          status: "booked",
        }
      : { status: "booked" }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          doctor: true,
          patient: true,
        },
        orderBy: { startTime: "asc" },
        skip,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ])

    return NextResponse.json({
      appointments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}

// POST - Create new appointment (with double-booking protection)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { doctorId, patientId, startTime, endTime, notes } = body

    if (!doctorId || !patientId || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    // Critical: Check for overlapping appointments for the same doctor
    const overlapping = await prisma.appointment.findFirst({
      where: {
        doctorId,
        status: "booked",
        startTime: { lt: end },
        endTime: { gt: start },
      },
    })

    if (overlapping) {
      return NextResponse.json(
        { error: "This doctor already has an appointment in this time slot. Double-booking is not allowed." },
        { status: 409 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId,
        startTime: start,
        endTime: end,
        notes: notes || null,
        status: "booked",
      },
      include: {
        doctor: true,
        patient: true,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
