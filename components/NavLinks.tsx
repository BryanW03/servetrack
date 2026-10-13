'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();

  const links = [
    { href: '/projects', label: 'Projects' },
    { href: '/volunteers', label: 'Volunteers' },
    ...(signedIn ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <nav aria-label="Main" className="border-b border-slate-300 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap gap-6 px-6">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'border-b-2 border-orange-500 py-3 font-semibold text-teal-800'
                  : 'border-b-2 border-transparent py-3 text-slate-700 hover:text-slate-900'
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
