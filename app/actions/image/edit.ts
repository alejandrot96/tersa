'use server';
import { database } from '@/lib/database';
import { parseError } from '@/lib/error/parse';
import { imageModels } from '@/lib/models/image';
// import { trackCreditUsage } from '@/lib/stripe';
//
import { projects } from '@/schema';
import type { Edge, Node, Viewport } from '@xyflow/react';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import OpenAI, { toFile } from 'openai';

type EditImageActionProps = {
  images: {
    url: string;
    type: string;
  }[];
  modelId: string;
  instructions?: string;
  nodeId: string;
  projectId: string;
  size?: string;
};

export const editImageAction = async ({
  images,
  instructions,
  modelId,
  nodeId,
  projectId,
  size,
}: EditImageActionProps): Promise<
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
    const openai = new OpenAI();

    const model = imageModels
      .flatMap((m) => m.models)
      .find((m) => m.id === modelId);

    if (!model) {
      throw new Error('Model not found');
    }

    if (!model.supportsEdit) {
      throw new Error('Model does not support editing');
    }

    const promptImages = await Promise.all(
      images.map(async (image) => {
        const response = await fetch(image.url);
        const blob = await response.blob();

        return toFile(blob, nanoid(), {
          type: image.type,
        });
      })
    );

    const defaultPrompt =
      images.length > 1
        ? 'Create a variant of the image.'
        : 'Create a single variant of the images.';

    const prompt =
      !instructions || instructions === '' ? defaultPrompt : instructions;

    const response = await openai.images.edit({
      model: model.model.modelId,
      image: promptImages,
      prompt,
      user: user.id,
      size: size as never | undefined,
      ...(model.providerOptions?.openai || { quality: 'high' }),
    });

    if (!response.usage) {
      throw new Error('No usage found');
    }

    // Credits disabled in debug

    const json = response.data?.at(0)?.b64_json;

    if (!json) {
      throw new Error('No url found');
    }

    const bytes = Buffer.from(json, 'base64');
    const contentType = 'image/png';

    // Storage disabled in debug; inline data URL
    const url = `data:${contentType};base64,${bytes.toString('base64')}`;

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
        type: contentType,
      },
      description: instructions ?? defaultPrompt,
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
    // Prevent base64 data from leaking into error messages
    let safeError = error;
    if (error instanceof Error && error.message.includes('base64') && error.message.length > 500) {
      safeError = new Error('Image editing failed');
    } else if (typeof error === 'string' && error.includes('base64') && error.length > 500) {
      safeError = 'Image editing failed';
    }
    
    const message = parseError(safeError);
    return { error: message };
  }
};
