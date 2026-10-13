import Link from 'next/link';

const features = [
  {
    title: 'Organize projects',
    text: 'Create service projects with a date and place so everyone knows where to show up.',
  },
  {
    title: 'Log your hours',
    text: 'Record the time you served in seconds and edit it later if something changes.',
  },
  {
    title: 'See the impact',
    text: 'Every volunteer and project shows the total hours served, all in one place.',
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center">
        <h2 className="font-display text-4xl font-bold text-slate-900">
          Track service, together.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-800">
          ServeTrack helps wards and communities organize service projects and
          keep track of volunteer hours in one place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-teal-800 px-6 py-3 font-medium text-white hover:bg-teal-900"
          >
            View projects
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-teal-800 px-6 py-3 font-medium text-teal-800 hover:bg-white"
          >
            Create an account
          </Link>
        </div>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="rounded-xl border border-slate-300 bg-white p-5"
          >
            <h3 className="font-display font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-slate-800">{feature.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
