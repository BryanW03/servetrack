CREATE TABLE IF NOT EXISTS volunteers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  organizer_id INTEGER NOT NULL REFERENCES volunteers(id)
);

CREATE TABLE IF NOT EXISTS hour_logs (
  id SERIAL PRIMARY KEY,
  volunteer_id INTEGER NOT NULL REFERENCES volunteers(id),
  project_id INTEGER NOT NULL REFERENCES projects(id),
  hours_served NUMERIC(5,2) NOT NULL,
  date_logged DATE NOT NULL,
  notes TEXT
);
