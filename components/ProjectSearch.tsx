'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const term = e.target.value;
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
      type="text"
      aria-label="Search projects by title or location"
      placeholder="Search by title or location..."
      defaultValue={searchParams.get('query')?.toString()}
      onChange={handleChange}
      className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0f766e] mb-6"
    />
  );
}
