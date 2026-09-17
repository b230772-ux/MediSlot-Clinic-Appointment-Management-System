# REASONING.md – MediSlot Clinic Appointment System

## Why this tech stack?
I chose **Next.js + TypeScript + Prisma + SQLite** because:
- Everything stays in one project (frontend + backend)
- Works perfectly in GitHub Codespaces with almost zero setup
- Prisma makes database work simple and safe
- SQLite needs no external database server

This combination allowed me to finish the core features quickly within the time limit.

## How double-booking is prevented
Before creating any new appointment, the system checks if the selected doctor already has a "booked" appointment that overlaps with the new time range.

The check uses this logic:
- Find any appointment where:
  - Same doctor
  - Status is still "booked"
  - Existing start time is before the new end time
  - Existing end time is after the new start time

If any overlapping appointment is found, the system rejects the booking with a clear error message. This guarantees no doctor is ever double-booked.

## Cancellation Rule
I implemented a clear and fair rule:

- If the patient cancels **24 hours or more** before the appointment start time → **No fee** (₹0)
- If the patient cancels **less than 24 hours** before the appointment → **Late fee of ₹200**

When a cancellation happens, the system:
1. Calculates the remaining hours
2. Sets the correct fee
3. Marks the appointment as "cancelled"
4. Stores the cancellation time and fee in the database

This rule is applied automatically and consistently.

## How I tested the system
1. Booked an appointment for a doctor → succeeded
2. Tried to book the same doctor in an overlapping time → correctly blocked
3. Cancelled an appointment more than 24 hours in advance → fee = ₹0
4. Cancelled an appointment less than 24 hours in advance → fee = ₹200
5. Searched appointments by patient name → worked
6. Checked that the landing page and dashboard load properly

## Issues faced and how I fixed them
- Prisma version confusion → Fixed by installing a stable version (5.22.0)
- Folder structure mistakes (lib folder in wrong place) → Corrected using terminal commands
- JSX incomplete when pasting long code → Replaced the entire page.tsx with a complete version
- Hydration warning from browser extensions → Noted that it is safe to ignore

## What I would improve with more time
- Add proper login/authentication for staff
- Doctor day calendar view
- Better pagination and sorting options
- SMS reminders for patients

Overall, the most important requirements (no double-booking + fair cancellation) are fully working and reliable.