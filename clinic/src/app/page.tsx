"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")

  const [doctorId, setDoctorId] = useState("")
  const [patientId, setPatientId] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  useEffect(() => {
    fetchDoctors()
    fetchPatients()
    fetchAppointments()
  }, [])

  async function fetchDoctors() {
    const res = await fetch("/api/doctors")
    const data = await res.json()
    setDoctors(data)
  }

  async function fetchPatients() {
    const res = await fetch("/api/patients")
    const data = await res.json()
    setPatients(data)
  }

  async function fetchAppointments() {
    const res = await fetch(`/api/appointments?search=${search}`)
    const data = await res.json()
    setAppointments(data.appointments || [])
  }

  async function handleBook(e: any) {
    e.preventDefault()
    setMessage("")

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, patientId, startTime, endTime }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error || "Failed to book")
      return
    }

    setMessage("Appointment booked successfully!")
    fetchAppointments()
  }

  async function handleCancel(id: string) {
    const res = await fetch(`/api/appointments/${id}/cancel`, {
      method: "PATCH",
    })
    const data = await res.json()
    setMessage(data.message || "Cancelled")
    fetchAppointments()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Landing / Hero Section */}
      <div className="bg-blue-700 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MediSlot</h1>
          <p className="text-xl mb-6">Clinic Appointment System for Front Desk</p>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Built for busy clinics. Prevents double-booking of doctors, handles late cancellation fees fairly, 
            and gives staff quick search & day views.
          </p>
          <a href="#dashboard" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50">
            Go to Dashboard
          </a>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Zero Double-Booking</h3>
            <p className="text-gray-600">Smart overlap check makes sure no two patients are given the same doctor slot.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Fair Cancellation Rule</h3>
            <p className="text-gray-600">Free if cancelled ≥ 24 hours before. Late cancellation automatically applies ₹200 fee.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Fast Lookups</h3>
            <p className="text-gray-600">Search patients by name and view any doctor’s schedule for the day.</p>
          </div>
        </div>
      </div>

      {/* Future Features */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">What We Would Build Next</h2>
          <ul className="space-y-3 max-w-2xl mx-auto text-gray-700">
            <li>• Patient SMS / WhatsApp reminders before appointment</li>
            <li>• Doctor mobile app to mark appointments as completed</li>
            <li>• Simple reports (daily revenue from cancellation fees + number of appointments)</li>
          </ul>
        </div>
      </div>

      {/* Dashboard Section */}
      <div id="dashboard" className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-2">Front Desk Dashboard</h2>
        <p className="text-gray-600 mb-8">Book, search and manage appointments</p>

        {message && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
            {message}
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Book New Appointment</h3>
          <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Doctor</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialty})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Patient</label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>

        {/* Appointments List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">Appointments</h3>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by patient or doctor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
              />
              <button
                onClick={fetchAppointments}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Patient</th>
                  <th className="py-2">Doctor</th>
                  <th className="py-2">Start</th>
                  <th className="py-2">End</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-b">
                    <td className="py-3">{a.patient?.name}</td>
                    <td className="py-3">{a.doctor?.name}</td>
                    <td className="py-3">{new Date(a.startTime).toLocaleString()}</td>
                    <td className="py-3">{new Date(a.endTime).toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          a.status === "booked"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {a.status}
                        {a.cancellationFee > 0 && ` (Fee: ₹${a.cancellationFee})`}
                      </span>
                    </td>
                    <td className="py-3">
                      {a.status === "booked" && (
                        <button
                          onClick={() => handleCancel(a.id)}
                          className="text-red-600 hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {appointments.length === 0 && (
              <p className="text-gray-500 py-8 text-center">No appointments found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}