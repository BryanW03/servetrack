'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormField';
import { register, AuthFormState } from '@/lib/auth-actions';

const initialState: AuthFormState = {};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <FormField
        id="name"
        name="name"
        label="Full name"
        required
        autoComplete="name"
        errors={errors.name}
      />
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        errors={errors.email}
      />
      <FormField
        id="password"
        name="password"
        label="Password"
        type="password"
        required
        autoComplete="new-password"
        hint="At least 8 characters."
        errors={errors.password}
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
        {isPending ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}
