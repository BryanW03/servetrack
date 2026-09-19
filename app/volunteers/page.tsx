import VolunteerCard from '@/components/VolunteerCard';
import { getVolunteers } from '@/lib/data';

export default function VolunteersPage() {
  const volunteers = getVolunteers();

  return (
    <section className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="font-display text-2xl font-bold mb-6">Volunteers</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {volunteers.map((volunteer) => (
          <VolunteerCard key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>
    </section>
  );
}
