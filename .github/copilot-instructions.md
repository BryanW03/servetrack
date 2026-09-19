# Copilot Instructions — ServeTrack

## Project
ServeTrack is a Next.js (App Router) + TypeScript app for organizing community
service projects and tracking volunteer hours.

## Tech Stack
- Next.js App Router, TypeScript, Tailwind CSS
- Database: PostgreSQL (planned, not yet integrated as of Week 03)

## Data Model
- `Volunteer`: id, name, email, phone?
- `ServiceProject`: id, title, description, date, location, organizerId (-> Volunteer)
- `HourLog`: id, volunteerId (-> Volunteer), projectId (-> ServiceProject), hoursServed, dateLogged, notes?
- Relationships: Volunteer <-> ServiceProject is many-to-many, tracked through HourLog.

## Naming Conventions
- Components: PascalCase, one component per file, in `components/`
- Types/interfaces: PascalCase, in `lib/types.ts`
- Data access functions: camelCase verbs (`getProjects`, `getProjectById`)

## Design System
- Primary color: teal `#0f766e`
- Accent color: warm orange `#f97316`
- Display font: Poppins (headings), body font: Inter
- Rounded corners (`rounded-xl`), card-based layout, generous spacing

## Conventions
- Prefer Server Components; mark Client Components explicitly with `'use client'`
- Avoid `any` — use the types in `lib/types.ts`
- Keep data-access functions in `lib/` separate from UI components
