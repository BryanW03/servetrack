// Core data model for ServeTrack.
// Volunteer and ServiceProject are related many-to-many through HourLog.

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
  organizerName?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface HourLog {
  id: number;
  volunteerId: number;
  projectId: number;
  hoursServed: number;
  dateLogged: string;
  notes?: string;
}

// An hour log joined with the volunteer and project names for display.
export interface HourLogEntry extends HourLog {
  volunteerName: string;
  projectTitle: string;
}

export interface NewHourLogInput {
  volunteerId: number;
  projectId: number;
  hoursServed: number;
  dateLogged: string;
  notes?: string;
}
