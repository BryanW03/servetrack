import Link from 'next/link';
import { ServiceProject } from '@/lib/types';

export default function ProjectCard({ project }: { project: ServiceProject }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block border border-slate-200 rounded-xl p-5 hover:border-[#0f766e] transition-colors bg-white"
    >
      <h3 className="font-display font-semibold text-slate-900">
        {project.title}
      </h3>
      <p className="text-sm text-slate-500 mt-1">
        {project.date} &middot; {project.location}
      </p>
      <p className="text-sm text-slate-600 mt-2">{project.description}</p>
    </Link>
  );
}
