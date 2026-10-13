import Link from 'next/link';
import { logout } from '@/lib/auth-actions';

export default function Header({ userName }: { userName: string | null }) {
  return (
    <header className="bg-teal-800 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight"
        >
          ServeTrack
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {userName ? (
            <>
              <span>Hi, {userName}</span>
              <form action={logout}>
                <button type="submit" className="underline">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="underline">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-white px-3 py-1 font-medium text-teal-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
