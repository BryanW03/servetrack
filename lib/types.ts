// Core data model for ServeTrack.
// Relationships: a Volunteer can log hours on many ServiceProjects, and a
// ServiceProject can have many Volunteers logging hours against it
// (many-to-many), tracked through HourLog (one row per logged session).

export interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface ServiceProject {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  organizerId: number; // references Volunteer.id
}

export interface HourLog {
  id: number;
  volunteerId: number; // references Volunteer.id
  projectId: number; // references ServiceProject.id
  hoursServed: number;
  dateLogged: string; // ISO date string
  notes?: string;
}
