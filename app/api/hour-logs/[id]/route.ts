import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { modifyHourLog, removeHourLog } from '@/lib/data';

const UpdateSchema = z.object({
  hoursServed: z.coerce
    .number()
    .positive('Enter the hours you served.')
    .max(24, 'A single entry cannot be more than 24 hours.'),
  notes: z
    .string()
    .max(500, 'Notes must be 500 characters or less.')
    .optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

// PATCH /api/hour-logs/[id]  ->  edit one of your own entries
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the hours and notes.' },
      { status: 400 }
    );
  }

  try {
    const updated = await modifyHourLog(
      id,
      Number(session.user.id),
      parsed.data
    );
    if (!updated) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Failed to update hours:', error);
    return NextResponse.json(
      { error: 'Could not update this entry.' },
      { status: 500 }
    );
  }
}

// DELETE /api/hour-logs/[id]  ->  remove one of your own entries
export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const removed = await removeHourLog(id, Number(session.user.id));
    if (!removed) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Failed to delete hours:', error);
    return NextResponse.json(
      { error: 'Could not delete this entry.' },
      { status: 500 }
    );
  }
}
