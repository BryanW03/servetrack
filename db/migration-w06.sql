-- Run ONCE on the existing database (it already has the 3 tables).
-- 1) Passwords for sign-up / login
ALTER TABLE volunteers ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- 2) Deleting a project also deletes its logged hours
ALTER TABLE hour_logs DROP CONSTRAINT IF EXISTS hour_logs_project_id_fkey;
ALTER TABLE hour_logs
  ADD CONSTRAINT hour_logs_project_id_fkey
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
