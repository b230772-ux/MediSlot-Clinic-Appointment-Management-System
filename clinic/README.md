This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# MediSlot – Clinic Appointment System

A simple and reliable front-desk system for clinics that prevents double-booking of doctors and handles cancellation fees fairly.

## Problem Solved
- Front desk was double-booking doctors
- Late cancellations were not charged properly
- Staff needed quick search by patient name and doctor day view

## Features
- Conflict-free appointment booking (overlap check)
- Fair cancellation rule:
  - Free if cancelled ≥ 24 hours before appointment
  - ₹200 fee if cancelled less than 24 hours before
- Search appointments by patient or doctor name
- Clean dashboard for front desk staff
- Landing page with product description

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Prisma + SQLite
- Tailwind CSS

## How to Run (GitHub Codespaces)

1. Open the Codespace
2. In Terminal run:
```bash
npm install
npx prisma db push
npx tsx seed.ts
npm run dev