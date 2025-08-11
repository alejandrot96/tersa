'use server';

import { currentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { parseError } from '@/lib/error/parse';
import { projects } from '@/schema';
import { eq } from 'drizzle-orm';

export const updateProjectAction = async (
  projectId: string,
  data: Partial<typeof projects.$inferInsert>
): Promise<
  | {
      success: true;
    }
  | {
      error: string;
    }
> => {
  try {
    const project = await database
      .update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId));

    if (!project) {
      throw new Error('Project not found');
    }

    return { success: true };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
