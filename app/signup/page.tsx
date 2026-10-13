import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import SignupForm from '@/components/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create a ServeTrack account to organize projects and log your service hours.',
};

export default async function SignupPage() {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="font-display mb-2 text-2xl font-bold">
        Create your account
      </h2>
      <p className="mb-6 text-sm text-slate-600">
        Already registered?{' '}
        <Link href="/login" className="font-medium text-teal-800 underline">
          Sign in
        </Link>
        .
      </p>
      <SignupForm />
    </section>
  );
}
