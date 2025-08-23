import { database } from '@/lib/database';
import { projects } from '@/schema';
import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createProjectAction } from './actions/project/create';
import { auth } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Tersa',
  description: 'Visualize your AI workflows.',
};

const Index = async () => {
  // Check if user is authenticated
  const { userId } = await auth();
  
  if (!userId) {
    // User is not authenticated, redirect to login
    return redirect('/auth/login');
  }

  // User is authenticated, get their projects
  const userProjects = await database.select().from(projects).where(eq(projects.userId, userId));

  if (!userProjects.length) {
    // Create first project for the user
    const newProject = await createProjectAction('Untitled Project', userId);

    if ('error' in newProject) {
      throw new Error(newProject.error);
    }

    return redirect(`/projects/${newProject.id}`);
  }

  redirect(`/projects/${userProjects[0].id}`);
};

export default Index;
