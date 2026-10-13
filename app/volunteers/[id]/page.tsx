import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EmptyState from '@/components/EmptyState';
import { getHourLogsForVolunteer, getVolunteerById } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) return { title: 'Volunteer Not Found' };

  const volunteer = await getVolunteerById(id);
  if (!volunteer) return { title: 'Volunteer Not Found' };

  return {
    title: volunteer.name,
    description: `Service hours logged by ${volunteer.name} on ServeTrack.`,
  };
}

export default async function VolunteerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    notFound();
  }

  const volunteer = await getVolunteerById(id);

  if (!volunteer) {
    notFound();
  }

  const logs = await getHourLogsForVolunteer(volunteer.id);
  const totalHours = logs.reduce((sum, log) => sum + log.hoursServed, 0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display text-2xl font-bold">{volunteer.name}</h2>
      <p className="mb-6 text-slate-700">{volunteer.email}</p>

      <div className="mb-6 rounded-xl border border-teal-800 bg-white p-4">
        <p className="text-sm text-slate-700">Total hours served</p>
        <p className="font-display text-3xl font-bold text-teal-800">
          {totalHours.toFixed(1)}
        </p>
      </div>

      <h3 className="font-display mb-3 text-lg font-semibold">Logged hours</h3>
      {logs.length === 0 ? (
        <EmptyState
          title="No hours logged yet"
          description="This volunteer has not logged any service hours."
        />
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li
              key={log.id}
              className="rounded-xl border border-slate-300 bg-white p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium text-slate-900">
                  {log.projectTitle}
                </span>
                <span className="text-sm text-slate-700">{log.dateLogged}</span>
              </div>
              <p className="mt-1 text-sm text-slate-800">
                {log.hoursServed} hours
                {log.notes ? ` — ${log.notes}` : ''}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
