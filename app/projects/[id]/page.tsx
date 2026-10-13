import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import EmptyState from '@/components/EmptyState';
import LogHoursForm from '@/components/LogHoursForm';
import { getHourLogsForProject, getProjectById } from '@/lib/data';
import { deleteProject } from '@/lib/project-actions';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) return { title: 'Project Not Found' };

  const project = await getProjectById(id);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description:
      `${project.title} on ${project.date} at ${project.location}. ${project.description}`.slice(
        0,
        160
      ),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) {
    notFound();
  }

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const session = await auth();
  const isOrganizer = Number(session?.user?.id) === project.organizerId;
  const logs = await getHourLogsForProject(project.id);
  const totalHours = logs.reduce((sum, log) => sum + log.hoursServed, 0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display text-2xl font-bold">{project.title}</h2>
      <p className="mt-1 text-slate-700">
        {project.date} &middot; {project.location}
      </p>
      {project.organizerName && (
        <p className="text-sm text-slate-700">
          Organized by {project.organizerName}
        </p>
      )}
      <p className="mt-4 text-slate-900">{project.description}</p>

      {isOrganizer && (
        <div className="mt-4 flex gap-3">
          <Link
            href={`/projects/${project.id}/edit`}
            className="rounded-lg border border-slate-500 px-4 py-2 text-sm text-slate-900 hover:bg-slate-100"
          >
            Edit project
          </Link>
          <form action={deleteProject}>
            <input type="hidden" name="id" value={project.id} />
            <button
              type="submit"
              className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-800 hover:bg-red-50"
            >
              Delete project
            </button>
          </form>
        </div>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-display mb-3 text-lg font-semibold">
            Volunteer hours ({totalHours.toFixed(1)} total)
          </h3>
          {logs.length === 0 ? (
            <EmptyState
              title="No hours logged yet"
              description="Be the first to log time on this project."
            />
          ) : (
            <ul className="space-y-3">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="rounded-xl border border-slate-300 bg-white p-4 text-sm"
                >
                  <Link
                    href={`/volunteers/${log.volunteerId}`}
                    className="font-medium text-teal-800 underline"
                  >
                    {log.volunteerName}
                  </Link>
                  <p className="text-slate-800">
                    {log.hoursServed} hours on {log.dateLogged}
                    {log.notes ? ` — ${log.notes}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {session ? (
            <LogHoursForm projectId={project.id} />
          ) : (
            <EmptyState
              title="Want to log your hours?"
              description="Sign in to record the time you served on this project."
              action={{ href: '/login', label: 'Sign in' }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
