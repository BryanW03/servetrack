'use client';

import { useActionState } from 'react';
import FormField from '@/components/FormField';
import {
  createProject,
  updateProject,
  ProjectFormState,
} from '@/lib/project-actions';
import { ServiceProject } from '@/lib/types';

const initialState: ProjectFormState = {};

// One form for both creating (no project prop) and editing a project.
export default function ProjectForm({ project }: { project?: ServiceProject }) {
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <FormField
        id="title"
        name="title"
        label="Project title"
        required
        defaultValue={project?.title}
        errors={errors.title}
      />
      <FormField
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        required
        defaultValue={project?.description}
        errors={errors.description}
      />
      <FormField
        id="date"
        name="date"
        label="Date"
        type="date"
        required
        defaultValue={project?.date}
        errors={errors.date}
      />
      <FormField
        id="location"
        name="location"
        label="Location"
        required
        defaultValue={project?.location}
        errors={errors.location}
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
        {isPending ? 'Saving...' : project ? 'Save changes' : 'Create project'}
      </button>
    </form>
  );
}
