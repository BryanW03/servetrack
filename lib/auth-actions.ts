'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { createUser } from './users';

export type AuthFormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

const SignupSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name (at least 2 characters).'),
  email: z.email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export async function authenticate(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: 'Invalid email or password.' };
    }
    // signIn redirects by throwing; let that pass through.
    throw error;
  }
  return {};
}

export async function register(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const result = SignupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, password } = result.data;
  const email = result.data.email.toLowerCase();

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await createUser({ name, email, passwordHash });
  } catch (error) {
    console.error('Failed to create account:', error);
    return {
      message:
        'Could not create the account. That email may already be in use.',
    };
  }

  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: 'Account created. Please sign in.' };
    }
    throw error;
  }
  return {};
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/' });
}
