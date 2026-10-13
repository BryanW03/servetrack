'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormField from '@/components/FormField';
import { HourLogEntry } from '@/lib/types';

const smallButton =
  'rounded-lg border border-slate-500 px-3 py-1 text-sm text-slate-900 hover:bg-slate-100 disabled:opacity-50';

// Client component: edits and deletes an hour log through the
// /api/hour-logs/[id] route handlers (PATCH and DELETE).
export default function HourLogItem({ log }: { log: HourLogEntry }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsPending(true);
    setError(null);

    const response = await fetch(`/api/hour-logs/${log.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hoursServed: data.get('hoursServed'),
        notes: data.get('notes') ?? '',
      }),
    });

    setIsPending(false);

    if (response.ok) {
      setIsEditing(false);
      router.refresh();
      return;
    }

    const body = (await response.json()) as { error?: string };
    setError(body.error ?? 'Could not update this entry.');
  }

  async function handleDelete() {
    if (!window.confirm('Delete this logged entry?')) return;

    setIsPending(true);
    setError(null);

    const response = await fetch(`/api/hour-logs/${log.id}`, {
      method: 'DELETE',
    });

    setIsPending(false);

    if (response.ok) {
      router.refresh();
      return;
    }

    const body = (await response.json()) as { error?: string };
    setError(body.error ?? 'Could not delete this entry.');
  }

  return (
    <li className="rounded-xl border border-slate-300 bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Link
          href={`/projects/${log.projectId}`}
          className="font-medium text-teal-800 underline"
        >
          {log.projectTitle}
        </Link>
        <span className="text-sm text-slate-700">{log.dateLogged}</span>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="mt-3 space-y-3">
          <FormField
            id={`hours-${log.id}`}
            name="hoursServed"
            label="Hours served"
            type="number"
            min={0.25}
            step="0.25"
            defaultValue={log.hoursServed}
            required
          />
          <FormField
            id={`notes-${log.id}`}
            name="notes"
            label="Notes"
            multiline
            rows={2}
            defaultValue={log.notes}
          />
          <div className="flex gap-2">
            <button type="submit" disabled={isPending} className={smallButton}>
              {isPending ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={smallButton}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="mt-1 text-sm text-slate-800">
            {log.hoursServed} hours
            {log.notes ? ` — ${log.notes}` : ''}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={smallButton}
              aria-label={`Edit hours for ${log.projectTitle} on ${log.dateLogged}`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className={`${smallButton} text-red-800`}
              aria-label={`Delete hours for ${log.projectTitle} on ${log.dateLogged}`}
            >
              Delete
            </button>
          </div>
        </>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </li>
  );
}
