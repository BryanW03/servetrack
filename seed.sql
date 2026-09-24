INSERT INTO volunteers (name, email) VALUES
('Bryan De Leon', 'bryan@example.com'),
('Ana Fernandez', 'ana@example.com'),
('Carlos Reyes', 'carlos@example.com');

INSERT INTO projects (title, description, date, location, organizer_id) VALUES
('Community Food Drive', 'Collecting and sorting food donations for local families.', '2026-10-03', 'Ward Cultural Hall', 1),
('Park Cleanup Day', 'Trash pickup and landscaping at the neighborhood park.', '2026-10-10', 'Parque Mirador Sur', 2),
('Senior Center Visit', 'Visiting and assisting residents at the senior center.', '2026-10-17', 'Centro de Ancianos Santo Domingo Este', 3);

INSERT INTO hour_logs (volunteer_id, project_id, hours_served, date_logged, notes) VALUES
(1, 1, 3.5, '2026-10-03', 'Helped sort donations'),
(2, 2, 2.0, '2026-10-10', 'Picked up trash'),
(3, 3, 4.0, '2026-10-17', 'Visited residents');
