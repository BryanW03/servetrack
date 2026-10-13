import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to ServeTrack to log volunteer hours and manage projects.',
};

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display mb-2 text-2xl font-bold">Sign in</h2>
      <p className="mb-6 text-sm text-slate-600">
        New here?{' '}
        <Link href="/signup" className="font-medium text-teal-800 underline">
          Create an account
        </Link>
        .
      </p>
      <LoginForm />
    </section>
  );
}
