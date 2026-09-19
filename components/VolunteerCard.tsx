import { Volunteer } from '@/lib/types';

export default function VolunteerCard({ volunteer }: { volunteer: Volunteer }) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white">
      <h3 className="font-display font-semibold text-slate-900">
        {volunteer.name}
      </h3>
      <p className="text-sm text-slate-500 mt-1">{volunteer.email}</p>
    </div>
  );
}
