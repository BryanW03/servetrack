'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormField';
import { authenticate, AuthFormState } from '@/lib/auth-actions';

const initialState: AuthFormState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState
  );

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
      />
      <FormField
        id="password"
        name="password"
        label="Password"
        type="password"
        required
        autoComplete="current-password"
      />

      {state.message && (
        <p role="alert" className="text-sm text-red-800">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-teal-800 px-5 py-2 text-sm font-medium text-white hover:bg-teal-900 disabled:opacity-50"
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
