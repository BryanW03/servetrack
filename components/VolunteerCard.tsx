import Link from 'next/link';
import { Volunteer } from '@/lib/types';

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  return (
    <Link
      href={`/volunteers/${volunteer.id}`}
      className="block rounded-xl border border-slate-300 bg-white p-5 transition-colors hover:border-teal-800 focus-visible:outline-2 focus-visible:outline-teal-800"
    >
      <h3 className="font-display font-semibold text-slate-900">
        {volunteer.name}
      </h3>
      <p className="mt-1 text-sm text-slate-700">{volunteer.email}</p>
    </Link>
  );
}
