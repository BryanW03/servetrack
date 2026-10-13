import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import VolunteerCard from '@/components/VolunteerCard';
import { getVolunteers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Volunteers',
  description: 'Meet the volunteers serving in the community.',
};

export default async function VolunteersPage() {
  const volunteers = await getVolunteers();

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display mb-6 text-2xl font-bold">Volunteers</h2>
      {volunteers.length === 0 ? (
        <EmptyState
          title="No volunteers yet"
          description="Create an account to be the first volunteer."
          action={{ href: '/signup', label: 'Sign up' }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      )}
    </section>
  );
}
