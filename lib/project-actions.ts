'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { insertProject, modifyProject, removeProject } from './data';

export type ProjectFormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

const ProjectSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.'),
  location: z.string().trim().min(2, 'Location is required.'),
});

// Every mutation needs a signed-in user; returns that user's id.
async function requireUserId(): Promise<number> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect('/login');
  return Number(userId);
}

export async function createProject(
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const userId = await requireUserId();
  const result = ProjectSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  let newId: number;
  try {
    newId = await insertProject(result.data, userId);
  } catch (error) {
    console.error('Failed to create project:', error);
    throw new Error(
      'Something went wrong while saving the project. Please try again.'
    );
  }

  revalidatePath('/projects');
  redirect(`/projects/${newId}`);
}

export async function updateProject(
  id: number,
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const userId = await requireUserId();
  const result = ProjectSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  let updated: boolean;
  try {
    updated = await modifyProject(id, userId, result.data);
  } catch (error) {
    console.error('Failed to update project:', error);
    throw new Error(
      'Something went wrong while saving the project. Please try again.'
    );
  }

  if (!updated) {
    return { message: 'You can only edit projects you organize.' };
  }

  revalidatePath('/projects');
  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(formData: FormData): Promise<void> {
  const userId = await requireUserId();
  const id = Number(formData.get('id'));

  try {
    await removeProject(id, userId);
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw new Error(
      'Something went wrong while deleting the project. Please try again.'
    );
  }

  revalidatePath('/projects');
  redirect('/projects');
}
