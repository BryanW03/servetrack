import type { Metadata } from 'next';
import ProjectForm from '@/components/ProjectForm';

export const metadata: Metadata = {
  title: 'New Project',
  description: 'Create a community service project for volunteers to join.',
};

export default function NewProjectPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display mb-6 text-2xl font-bold">
        Create a service project
      </h2>
      <ProjectForm />
    </section>
  );
}
