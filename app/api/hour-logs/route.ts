import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { getHourLogsForVolunteer, insertHourLog } from '@/lib/data';

const HourLogSchema = z.object({
  projectId: z.coerce.number().int().positive('Choose a project.'),
  hoursServed: z.coerce
    .number()
    .positive('Enter the hours you served.')
    .max(24, 'A single entry cannot be more than 24 hours.'),
  dateLogged: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.'),
  notes: z
    .string()
    .max(500, 'Notes must be 500 characters or less.')
    .optional(),
});

// GET /api/hour-logs  ->  the signed-in volunteer's logged hours
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const logs = await getHourLogsForVolunteer(Number(session.user.id));
  return NextResponse.json(logs);
}

// POST /api/hour-logs  ->  log hours for the signed-in volunteer
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = HourLogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please fix the errors below.',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const id = await insertHourLog({
      volunteerId: Number(session.user.id),
      ...parsed.data,
    });
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error('Failed to save hours:', error);
    return NextResponse.json(
      { error: 'Could not save your hours. Please try again.' },
      { status: 500 }
    );
  }
}
