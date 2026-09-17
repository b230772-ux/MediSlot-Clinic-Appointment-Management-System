import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    })

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 })
    }

    if (appointment.status === "cancelled") {
      return NextResponse.json({ error: "Appointment is already cancelled" }, { status: 400 })
    }

    const now = new Date()
    const startTime = new Date(appointment.startTime)
    const hoursDifference = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    const cancellationFee = hoursDifference < 24 ? 200 : 0

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: "cancelled",
        cancellationFee,
        cancelledAt: now,
      },
      include: {
        doctor: true,
        patient: true,
      },
    })

    return NextResponse.json({
      message:
        cancellationFee === 0
          ? "Appointment cancelled successfully. No fee charged."
          : `Appointment cancelled. Late cancellation fee of ₹${cancellationFee} applied.`,
      appointment: updated,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to cancel appointment" }, { status: 500 })
  }
}