import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import EmptyState from '@/components/EmptyState';
import ProjectCard from '@/components/ProjectCard';
import ProjectSearch from '@/components/ProjectSearch';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse and search upcoming community service projects.',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const session = await auth();
  const projects = await getProjects(query);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold">
          Upcoming service projects
        </h2>
        {session && (
          <Link
            href="/projects/new"
            className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900"
          >
            New project
          </Link>
        )}
      </div>

      <ProjectSearch />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description={
            query
              ? 'Nothing matches your search. Try a different word.'
              : 'There are no service projects yet.'
          }
          action={
            session && !query
              ? { href: '/projects/new', label: 'Create the first project' }
              : undefined
          }
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
