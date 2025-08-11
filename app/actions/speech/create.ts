'use server';
import { database } from '@/lib/database';
import { parseError } from '@/lib/error/parse';
import { speechModels } from '@/lib/models/speech';
// import { trackCreditUsage } from '@/lib/stripe';
//
import { projects } from '@/schema';
import type { Edge, Node, Viewport } from '@xyflow/react';
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { eq } from 'drizzle-orm';

type GenerateSpeechActionProps = {
  text: string;
  modelId: string;
  nodeId: string;
  projectId: string;
  instructions?: string;
  voice?: string;
};

export const generateSpeechAction = async ({
  text,
  nodeId,
  modelId,
  projectId,
  instructions,
  voice,
}: GenerateSpeechActionProps): Promise<
  | {
      nodeData: object;
    }
  | {
      error: string;
    }
> => {
  try {
    // Supabase/auth disabled in debug
    const user = { id: 'debug-user-id' } as const;
    const client: any = null;

    const model = speechModels
      .flatMap((m) => m.models)
      .find((m) => m.id === modelId);

    if (!model) {
      throw new Error('Model not found');
    }

    const { audio } = await generateSpeech({
      model: model.model,
      text,
      outputFormat: 'mp3',
      instructions,
      voice,
    });

    // Credits disabled in debug

    // Storage disabled in debug; inline data URL
    const url = `data:${audio.mediaType};base64,${Buffer.from(audio.uint8Array).toString('base64')}`;

    const allProjects = await database
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));
    const project = allProjects.at(0);

    if (!project) {
      throw new Error('Project not found');
    }

    const content = project.content as {
      nodes: Node[];
      edges: Edge[];
      viewport: Viewport;
    };

    const existingNode = content.nodes.find((n) => n.id === nodeId);

    if (!existingNode) {
      throw new Error('Node not found');
    }

    const newData = {
      ...(existingNode.data ?? {}),
      updatedAt: new Date().toISOString(),
      generated: {
        url,
        type: audio.mediaType,
      },
    };

    const updatedNodes = content.nodes.map((existingNode) => {
      if (existingNode.id === nodeId) {
        return {
          ...existingNode,
          data: newData,
        };
      }

      return existingNode;
    });

    await database
      .update(projects)
      .set({ content: { ...content, nodes: updatedNodes } })
      .where(eq(projects.id, projectId));

    return {
      nodeData: newData,
    };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
