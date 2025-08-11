'use server';

// import { getSubscribedUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { parseError } from '@/lib/error/parse';
import { transcriptionModels } from '@/lib/models/transcription';
import { projects } from '@/schema';
import { experimental_transcribe as transcribe } from 'ai';
import { eq } from 'drizzle-orm';

export const transcribeAction = async (
  url: string,
  projectId: string
): Promise<
  | {
      transcript: string;
    }
  | {
      error: string;
    }
> => {
  try {
    // Auth disabled in debug
    // await getSubscribedUser();

    const project = await database
      .select({
        transcriptionModel: projects.transcriptionModel,
      })
      .from(projects)
      .where(eq(projects.id, projectId));

    if (!project?.length) {
      throw new Error('Project not found');
    }

    const model = transcriptionModels
      .flatMap((model) => model.models)
      .find((model) => model.id === project[0].transcriptionModel);

    if (!model) {
      throw new Error('Model not found');
    }

    // For data URLs, we need to convert them to a format the transcription model can handle
    let audioInput: URL | Uint8Array;
    
    if (url.startsWith('data:')) {
      // Convert data URL to Uint8Array for transcription
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      audioInput = new Uint8Array(arrayBuffer);
    } else {
      audioInput = new URL(url);
    }

    const transcript = await transcribe({
      model: model.model,
      audio: audioInput,
    });

    return {
      transcript: transcript.text,
    };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
