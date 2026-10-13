'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// Search box that keeps its value in the URL (?query=...).
export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="search"
      aria-label="Search projects by title or location"
      placeholder="Search by title or location..."
      defaultValue={searchParams.get('query')?.toString()}
      onChange={handleChange}
      className="mb-6 w-full rounded-lg border border-slate-500 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-800"
    />
  );
}
