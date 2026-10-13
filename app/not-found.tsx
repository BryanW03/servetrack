import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-bold">Page not found</h2>
      <p className="mt-2 text-slate-800">
        We could not find what you were looking for.
      </p>
      <Link
        href="/projects"
        className="mt-6 inline-block rounded-lg bg-teal-800 px-5 py-2 text-sm font-medium text-white hover:bg-teal-900"
      >
        Browse projects
      </Link>
    </section>
  );
}
