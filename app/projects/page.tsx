import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/data';

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="font-display text-2xl font-bold mb-6">
        Upcoming Service Projects
      </h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
