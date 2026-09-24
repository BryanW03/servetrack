import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/data';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-10">
      <h2 className="font-display text-2xl font-bold mb-2">{project.title}</h2>
      <p className="text-slate-500 mb-4">
        {project.date} &middot; {project.location}
      </p>
      <p className="text-slate-700">{project.description}</p>
    </section>
  );
}
