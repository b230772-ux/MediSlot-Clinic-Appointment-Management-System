import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    const patients = await prisma.patient.findMany({
      where: search ? { name: { contains: search } } : {},
      orderBy: { name: "asc" }
    })
    return NextResponse.json(patients)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
  }
}
