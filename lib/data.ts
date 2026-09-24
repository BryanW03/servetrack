import { sql } from './db';
import { Volunteer, ServiceProject } from './types';

interface ProjectRow {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer_id: number;
}

interface VolunteerRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

function mapProject(row: ProjectRow): ServiceProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: String(row.date).slice(0, 10),
    location: row.location,
    organizerId: row.organizer_id,
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

export async function getProjects(query?: string): Promise<ServiceProject[]> {
  if (query) {
    const term = `%${query}%`;
    const rows = (await sql`
      SELECT * FROM projects
      WHERE title ILIKE ${term} OR location ILIKE ${term}
      ORDER BY date ASC
    `) as unknown as ProjectRow[];
    return rows.map(mapProject);
  }

  const rows = (await sql`
    SELECT * FROM projects ORDER BY date ASC
  `) as unknown as ProjectRow[];
  return rows.map(mapProject);
}

export async function getProjectById(
  id: number
): Promise<ServiceProject | undefined> {
  const rows = (await sql`
    SELECT * FROM projects WHERE id = ${id}
  `) as unknown as ProjectRow[];
  return rows[0] ? mapProject(rows[0]) : undefined;
}

export async function getVolunteers(): Promise<Volunteer[]> {
  const rows = (await sql`
    SELECT * FROM volunteers ORDER BY name ASC
  `) as unknown as VolunteerRow[];
  return rows.map(mapVolunteer);
}
