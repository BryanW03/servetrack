'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-slate-800">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-teal-800 px-5 py-2 text-sm font-medium text-white hover:bg-teal-900"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-teal-800 px-5 py-2 text-sm font-medium text-teal-800"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
