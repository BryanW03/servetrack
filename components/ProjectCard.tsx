import Link from 'next/link';
import { ServiceProject } from '@/lib/types';

export default function ProjectCard({ project }: { project: ServiceProject }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-xl border border-slate-300 bg-white p-5 transition-colors hover:border-teal-800 focus-visible:outline-2 focus-visible:outline-teal-800"
    >
      <h3 className="font-display font-semibold text-slate-900">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-slate-700">
        {project.date} &middot; {project.location}
      </p>
      <p className="mt-2 line-clamp-2 text-sm text-slate-800">
        {project.description}
      </p>
      {project.organizerName && (
        <p className="mt-3 text-xs text-slate-700">
          Organized by {project.organizerName}
        </p>
      )}
    </Link>
  );
}
