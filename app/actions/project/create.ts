'use server';

import { nanoid } from 'nanoid';
import { database } from '@/lib/database';
import { parseError } from '@/lib/error/parse';
import { transcriptionModels } from '@/lib/models/transcription';
import { visionModels } from '@/lib/models/vision';
import { projects } from '@/schema';

const defaultTranscriptionModel = transcriptionModels
  .flatMap((model) => model.models)
  .find((model) => model.default);

const defaultVisionModel = visionModels
  .flatMap((model) => model.models)
  .find((model) => model.default);

if (!defaultTranscriptionModel) {
  throw new Error('No default transcription model found');
}

if (!defaultVisionModel) {
  throw new Error('No default vision model found');
}

export const createProjectAction = async (
  name: string
): Promise<
  | {
      id: string;
    }
  | {
      error: string;
    }
> => {
  try {
    const project = await database
      .insert(projects)
      .values({
        id: nanoid(),
        name,
        transcriptionModel: defaultTranscriptionModel.id,
        visionModel: defaultVisionModel.id,
      })
      .returning({ id: projects.id });

    if (!project?.length) {
      throw new Error('Failed to create project');
    }

    return { id: project[0].id };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
