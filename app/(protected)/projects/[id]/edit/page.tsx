import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/auth';
import ProjectForm from '@/components/ProjectForm';
import { getProjectById } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Edit Project',
  description: 'Update the details of a service project you organize.',
};

export default async function EditProjectPage({
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

  // Only the organizer may edit; everyone else goes back to the project.
  const session = await auth();
  if (Number(session?.user?.id) !== project.organizerId) {
    redirect(`/projects/${id}`);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display mb-6 text-2xl font-bold">Edit project</h2>
      <ProjectForm project={project} />
    </section>
  );
}
