import { Volunteer, ServiceProject } from './types';

// Temporary in-memory placeholder data for the MVP.
// Will be replaced by a real PostgreSQL database in Week 04+.

export const volunteers: Volunteer[] = [
  { id: 1, name: 'Bryan De Leon', email: 'bryan@example.com' },
  { id: 2, name: 'Ana Fernandez', email: 'ana@example.com' },
  { id: 3, name: 'Carlos Reyes', email: 'carlos@example.com' },
];

export const projects: ServiceProject[] = [
  {
    id: 1,
    title: 'Community Food Drive',
    description: 'Collecting and sorting food donations for local families.',
    date: '2026-10-03',
    location: 'Ward Cultural Hall',
    organizerId: 1,
  },
  {
    id: 2,
    title: 'Park Cleanup Day',
    description: 'Trash pickup and landscaping at the neighborhood park.',
    date: '2026-10-10',
    location: 'Parque Mirador Sur',
    organizerId: 2,
  },
  {
    id: 3,
    title: 'Senior Center Visit',
    description: 'Visiting and assisting residents at the senior center.',
    date: '2026-10-17',
    location: 'Centro de Ancianos Santo Domingo Este',
    organizerId: 3,
  },
];

export function getProjects() {
  return projects;
}

export function getProjectById(id: number) {
  return projects.find((p) => p.id === id);
}

export function getVolunteers() {
  return volunteers;
}
