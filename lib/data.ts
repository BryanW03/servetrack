import { sql } from './db';
import {
  HourLogEntry,
  NewHourLogInput,
  ProjectInput,
  ServiceProject,
  Volunteer,
} from './types';

interface ProjectRow {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer_id: number;
  organizer_name: string | null;
}

interface VolunteerRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

interface HourLogRow {
  id: number;
  volunteer_id: number;
  volunteer_name: string;
  project_id: number;
  project_title: string;
  hours_served: string;
  date_logged: string;
  notes: string | null;
}

function mapProject(row: ProjectRow): ServiceProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: String(row.date).slice(0, 10),
    location: row.location,
    organizerId: row.organizer_id,
    organizerName: row.organizer_name ?? undefined,
  };
}

function mapVolunteer(row: VolunteerRow): Volunteer {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
  };
}

function mapHourLog(row: HourLogRow): HourLogEntry {
  return {
    id: row.id,
    volunteerId: row.volunteer_id,
    volunteerName: row.volunteer_name,
    projectId: row.project_id,
    projectTitle: row.project_title,
    hoursServed: Number(row.hours_served),
    dateLogged: String(row.date_logged).slice(0, 10),
    notes: row.notes ?? undefined,
  };
}

// ---------- Projects ----------

export async function getProjects(query?: string): Promise<ServiceProject[]> {
  if (query) {
    const term = `%${query}%`;
    const rows = (await sql`
      SELECT p.*, v.name AS organizer_name
      FROM projects p
      JOIN volunteers v ON v.id = p.organizer_id
      WHERE p.title ILIKE ${term} OR p.location ILIKE ${term}
      ORDER BY p.date ASC
    `) as unknown as ProjectRow[];
    return rows.map(mapProject);
  }

  const rows = (await sql`
    SELECT p.*, v.name AS organizer_name
    FROM projects p
    JOIN volunteers v ON v.id = p.organizer_id
    ORDER BY p.date ASC
  `) as unknown as ProjectRow[];
  return rows.map(mapProject);
}

export async function getProjectById(
  id: number
): Promise<ServiceProject | undefined> {
  const rows = (await sql`
    SELECT p.*, v.name AS organizer_name
    FROM projects p
    JOIN volunteers v ON v.id = p.organizer_id
    WHERE p.id = ${id}
  `) as unknown as ProjectRow[];
  return rows[0] ? mapProject(rows[0]) : undefined;
}

export async function getProjectsByOrganizer(
  organizerId: number
): Promise<ServiceProject[]> {
  const rows = (await sql`
    SELECT p.*, v.name AS organizer_name
    FROM projects p
    JOIN volunteers v ON v.id = p.organizer_id
    WHERE p.organizer_id = ${organizerId}
    ORDER BY p.date ASC
  `) as unknown as ProjectRow[];
  return rows.map(mapProject);
}

export async function insertProject(
  input: ProjectInput,
  organizerId: number
): Promise<number> {
  const rows = (await sql`
    INSERT INTO projects (title, description, date, location, organizer_id)
    VALUES (${input.title}, ${input.description}, ${input.date}, ${input.location}, ${organizerId})
    RETURNING id
  `) as unknown as { id: number }[];
  return rows[0].id;
}

// Only the organizer can change or remove a project (checked in SQL).
export async function modifyProject(
  id: number,
  organizerId: number,
  input: ProjectInput
): Promise<boolean> {
  const rows = (await sql`
    UPDATE projects
    SET title = ${input.title}, description = ${input.description},
        date = ${input.date}, location = ${input.location}
    WHERE id = ${id} AND organizer_id = ${organizerId}
    RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}

export async function removeProject(
  id: number,
  organizerId: number
): Promise<boolean> {
  const rows = (await sql`
    DELETE FROM projects WHERE id = ${id} AND organizer_id = ${organizerId}
    RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}

// ---------- Volunteers ----------

export async function getVolunteers(): Promise<Volunteer[]> {
  const rows = (await sql`
    SELECT id, name, email, phone FROM volunteers ORDER BY name ASC
  `) as unknown as VolunteerRow[];
  return rows.map(mapVolunteer);
}

export async function getVolunteerById(
  id: number
): Promise<Volunteer | undefined> {
  const rows = (await sql`
    SELECT id, name, email, phone FROM volunteers WHERE id = ${id}
  `) as unknown as VolunteerRow[];
  return rows[0] ? mapVolunteer(rows[0]) : undefined;
}

// ---------- Hour logs ----------

export async function getHourLogsForVolunteer(
  volunteerId: number
): Promise<HourLogEntry[]> {
  const rows = (await sql`
    SELECT hl.id, hl.volunteer_id, v.name AS volunteer_name, hl.project_id,
           p.title AS project_title, hl.hours_served, hl.date_logged, hl.notes
    FROM hour_logs hl
    JOIN volunteers v ON v.id = hl.volunteer_id
    JOIN projects p ON p.id = hl.project_id
    WHERE hl.volunteer_id = ${volunteerId}
    ORDER BY hl.date_logged DESC, hl.id DESC
  `) as unknown as HourLogRow[];
  return rows.map(mapHourLog);
}

export async function getHourLogsForProject(
  projectId: number
): Promise<HourLogEntry[]> {
  const rows = (await sql`
    SELECT hl.id, hl.volunteer_id, v.name AS volunteer_name, hl.project_id,
           p.title AS project_title, hl.hours_served, hl.date_logged, hl.notes
    FROM hour_logs hl
    JOIN volunteers v ON v.id = hl.volunteer_id
    JOIN projects p ON p.id = hl.project_id
    WHERE hl.project_id = ${projectId}
    ORDER BY hl.date_logged DESC, hl.id DESC
  `) as unknown as HourLogRow[];
  return rows.map(mapHourLog);
}

export async function insertHourLog(input: NewHourLogInput): Promise<number> {
  const rows = (await sql`
    INSERT INTO hour_logs (volunteer_id, project_id, hours_served, date_logged, notes)
    VALUES (${input.volunteerId}, ${input.projectId}, ${input.hoursServed}, ${input.dateLogged}, ${input.notes ?? null})
    RETURNING id
  `) as unknown as { id: number }[];
  return rows[0].id;
}

// Volunteers can only change or remove their own entries (checked in SQL).
export async function modifyHourLog(
  id: number,
  volunteerId: number,
  input: { hoursServed: number; notes?: string }
): Promise<boolean> {
  const rows = (await sql`
    UPDATE hour_logs
    SET hours_served = ${input.hoursServed}, notes = ${input.notes || null}
    WHERE id = ${id} AND volunteer_id = ${volunteerId}
    RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}

export async function removeHourLog(
  id: number,
  volunteerId: number
): Promise<boolean> {
  const rows = (await sql`
    DELETE FROM hour_logs WHERE id = ${id} AND volunteer_id = ${volunteerId}
    RETURNING id
  `) as unknown as { id: number }[];
  return rows.length > 0;
}
