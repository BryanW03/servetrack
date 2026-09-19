import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-2xl mx-auto text-center px-6 py-20">
      <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
        Track service, together.
      </h2>
      <p className="text-slate-600 mb-8 leading-relaxed">
        ServeTrack helps wards and communities organize service projects and
        keep track of volunteer hours in one place.
      </p>
      <Link
        href="/projects"
        className="inline-block px-6 py-3 bg-[#0f766e] text-white rounded-lg font-medium hover:bg-[#0d5f58]"
      >
        View Projects
      </Link>
    </section>
  );
}
