import { database } from '@/lib/database';
import { projects } from '@/schema';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createProjectAction } from './actions/project/create';

export const metadata: Metadata = {
  title: 'Tersa',
  description: 'Visualize your AI workflows.',
};

const Index = async () => {
  const allProjects = await database.select().from(projects);

  if (!allProjects.length) {
    const newProject = await createProjectAction('Untitled Project');

    if ('error' in newProject) {
      throw new Error(newProject.error);
    }

    return redirect(`/projects/${newProject.id}`);
  }

  redirect(`/projects/${allProjects[0].id}`);
};

export default Index;
