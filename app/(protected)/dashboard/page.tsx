import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import EmptyState from '@/components/EmptyState';
import HourLogItem from '@/components/HourLogItem';
import ProjectCard from '@/components/ProjectCard';
import { getHourLogsForVolunteer, getProjectsByOrganizer } from '@/lib/data';

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'Your logged volunteer hours and the projects you organize.',
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const [logs, projects] = await Promise.all([
    getHourLogsForVolunteer(userId),
    getProjectsByOrganizer(userId),
  ]);

  const totalHours = logs.reduce((sum, log) => sum + log.hoursServed, 0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display mb-6 text-2xl font-bold">
        Welcome, {session?.user?.name}
      </h2>

      <div className="mb-8 rounded-xl border border-teal-800 bg-white p-5">
        <p className="text-sm text-slate-700">Total hours served</p>
        <p className="font-display text-4xl font-bold text-teal-800">
          {totalHours.toFixed(1)}
        </p>
      </div>

      <h3 className="font-display mb-3 text-lg font-semibold">
        My logged hours
      </h3>
      {logs.length === 0 ? (
        <EmptyState
          title="No hours logged yet"
          description="Open a project and log the time you served."
          action={{ href: '/projects', label: 'Browse projects' }}
        />
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <HourLogItem key={log.id} log={log} />
          ))}
        </ul>
      )}

      <div className="mb-3 mt-10 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">
          Projects I organize
        </h3>
        <Link
          href="/projects/new"
          className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900"
        >
          New project
        </Link>
      </div>
      {projects.length === 0 ? (
        <EmptyState
          title="You are not organizing any projects"
          description="Create a project so volunteers can join and log hours."
          action={{ href: '/projects/new', label: 'Create a project' }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
