# ServeTrack

ServeTrack is a community service tracker built for the WDD 430 team project. Volunteers can sign up, browse and organize service projects, and log the hours they serve, so wards and community groups can see the impact of their work in one place.

**Live app:** [PEGA AQUI TU URL DE VERCEL]

## Team Members

- Bryan De Leon ([@BryanW03](https://github.com/BryanW03)) - team leader, full-stack development
- Dreiser Morales Morales Chacon - team member (WDD 430 Team 10)

## Features

- Sign up, sign in, and sign out (Auth.js v5, Credentials provider, bcrypt-hashed passwords)
- Protected routes: `/dashboard`, `/projects/new`, `/projects/[id]/edit`
- Projects: create, read, update, and delete (only the organizer can edit or delete)
- Hour logs: create, read, update, and delete (only the volunteer who logged them)
- Search projects by title or location (state kept in the URL)
- Public views: home, projects, project detail, volunteers, volunteer detail
- Loading, empty, error, and not-found states

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS, Auth.js v5, PostgreSQL on Neon, Zod, bcryptjs, deployed on Vercel.

## Setup

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/BryanW03/servetrack.git
   cd servetrack
   npm install
   ```

2. Create a Postgres database (Neon through Vercel Storage works well) and run `db/schema.sql` in its SQL editor. If you already have the first three tables, run `db/migration-w06.sql` instead.

3. Create `.env.local` in the project root:

   ```
   DATABASE_URL=your_neon_connection_string
   AUTH_SECRET=a_long_random_string
   ```

   Generate a secret with: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

4. Start the app with `npm run dev` and open http://localhost:3000.

Other scripts: `npm run lint`, `npm run build`, `npm run format`.

## Deployment (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables `DATABASE_URL` and `AUTH_SECRET` (Production and Preview).
3. Deploy. Every merge to `main` redeploys automatically.

## API Routes

| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET | `/api/projects?query=` | No | List projects, optionally filtered by title or location |
| GET | `/api/hour-logs` | Yes | List the signed-in volunteer's logged hours |
| POST | `/api/hour-logs` | Yes | Log hours. Body: `projectId`, `hoursServed`, `dateLogged`, `notes?` |
| PATCH | `/api/hour-logs/[id]` | Yes (owner) | Update `hoursServed` and `notes` |
| DELETE | `/api/hour-logs/[id]` | Yes (owner) | Delete an entry |
| GET/POST | `/api/auth/[...nextauth]` | - | Auth.js handlers |

Projects are created, updated, and deleted with Server Actions (`lib/project-actions.ts`). Sign up, sign in, and sign out use Server Actions in `lib/auth-actions.ts`.

## Project Structure

- `app/` - routes (`(protected)` group for signed-in pages, `api/` route handlers)
- `components/` - reusable components (FormField, EmptyState, ProjectCard, VolunteerCard, HourLogItem, LogHoursForm, ProjectForm, Header, Footer, NavLinks)
- `lib/` - data access (`data.ts`), types, validation, and actions
- `db/` - SQL schema and migration

## Product Demo

ServeTrack replaces scattered spreadsheets and chat messages with one place to organize service projects and record hours. A visitor can browse projects and volunteers without an account. After signing up, a volunteer opens a project, logs the hours they served, and manages those entries from their dashboard. Organizers create and edit their own projects.

## Known Issues and Opportunities

- No password reset or email verification yet.
- No admin role; any signed-in volunteer can create projects.
- Volunteers can log hours on any project without organizer approval.
- Lists are not paginated.
- Opportunity: reports and CSV export of hours, and notifications for upcoming projects.

## Lighthouse (mobile)

Performance: [__] / Accessibility: [__] / Best Practices: [__] / SEO: [__]
