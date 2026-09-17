import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Doctors
  await prisma.doctor.create({
    data: { name: "Dr. Sharma", specialty: "General Physician" }
  })
  await prisma.doctor.create({
    data: { name: "Dr. Patel", specialty: "Pediatrician" }
  })
  await prisma.doctor.create({
    data: { name: "Dr. Khan", specialty: "Dermatologist" }
  })

  // Create Patients
  await prisma.patient.create({ data: { name: "Rahul Verma", phone: "9876543210" } })
  await prisma.patient.create({ data: { name: "Priya Singh", phone: "9876543211" } })
  await prisma.patient.create({ data: { name: "Amit Kumar", phone: "9876543212" } })
  await prisma.patient.create({ data: { name: "Sneha Gupta", phone: "9876543213" } })

  console.log("Seed data created successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })