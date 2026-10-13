'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/FormField';

interface ApiError {
  error?: string;
  details?: Record<string, string[]>;
}

// Client component: sends the form to the POST /api/hour-logs route handler,
// which validates the data and writes it to the database.
export default function LogHoursForm({ projectId }: { projectId: number }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setIsPending(true);
    setMessage(null);
    setErrors({});

    const response = await fetch('/api/hour-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        hoursServed: data.get('hoursServed'),
        dateLogged: data.get('dateLogged'),
        notes: data.get('notes') || undefined,
      }),
    });

    setIsPending(false);

    if (response.ok) {
      form.reset();
      setIsSuccess(true);
      setMessage('Hours logged. Thank you for serving!');
      router.refresh();
      return;
    }

    const body = (await response.json()) as ApiError;
    setIsSuccess(false);
    setErrors(body.details ?? {});
    setMessage(body.error ?? 'Something went wrong. Please try again.');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-300 bg-white p-5"
    >
      <h3 className="font-display text-lg font-semibold">Log your hours</h3>

      <FormField
        id="hoursServed"
        name="hoursServed"
        label="Hours served"
        type="number"
        min={0.25}
        step="0.25"
        required
        errors={errors.hoursServed}
      />
      <FormField
        id="dateLogged"
        name="dateLogged"
        label="Date"
        type="date"
        required
        errors={errors.dateLogged}
      />
      <FormField
        id="notes"
        name="notes"
        label="Notes (optional)"
        multiline
        rows={2}
        errors={errors.notes}
      />

      {message && (
        <p
          role={isSuccess ? 'status' : 'alert'}
          className={
            isSuccess ? 'text-sm text-teal-900' : 'text-sm text-red-800'
          }
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-teal-800 px-5 py-2 text-sm font-medium text-white hover:bg-teal-900 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Log hours'}
      </button>
    </form>
  );
}
