import ProjectCard from '@/components/ProjectCard';
import ProjectSearch from '@/components/ProjectSearch';
import { getProjects } from '@/lib/data';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const projects = await getProjects(query);

  return (
    <section className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="font-display text-2xl font-bold mb-4">
        Upcoming Service Projects
      </h2>
      <ProjectSearch />
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-slate-500 mt-6">No projects match your search.</p>
      )}
    </section>
  );
}
