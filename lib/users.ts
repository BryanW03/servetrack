import { sql } from './db';

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string | null;
}

export async function getUserByEmail(
  email: string
): Promise<UserRecord | undefined> {
  const rows = (await sql`
    SELECT id, name, email, password_hash FROM volunteers WHERE email = ${email}
  `) as unknown as UserRow[];

  const row = rows[0];
  if (!row || !row.password_hash) return undefined;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
  };
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<number> {
  const rows = (await sql`
    INSERT INTO volunteers (name, email, password_hash)
    VALUES (${input.name}, ${input.email}, ${input.passwordHash})
    RETURNING id
  `) as unknown as { id: number }[];

  return rows[0].id;
}
