import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { href: string; label: string };
}

// Reusable empty-state message used on lists that have no data yet.
export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-500 bg-white p-8 text-center">
      <h3 className="font-display text-lg font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-700">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-block rounded-lg bg-teal-800 px-5 py-2 text-sm font-medium text-white hover:bg-teal-900"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
