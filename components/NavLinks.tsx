'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/volunteers', label: 'Volunteers' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 px-6 py-3 border-b border-slate-200">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? 'text-[#0f766e] font-semibold border-b-2 border-[#f97316] pb-1'
                : 'text-slate-500 hover:text-slate-800 pb-1'
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
