'use server';
import { database } from '@/lib/database';
import { parseError } from '@/lib/error/parse';
import { videoModels } from '@/lib/models/video';
// import { trackCreditUsage } from '@/lib/stripe';
//
import { projects } from '@/schema';
import type { Edge, Node, Viewport } from '@xyflow/react';
import { eq } from 'drizzle-orm';
import { generateLumaVideo } from './lib/create-luma';
import { generateMinimaxVideo } from './lib/create-minimax';
import { generateRunwayVideo } from './lib/create-runway';

type GenerateVideoActionProps = {
  modelId: string;
  prompt: string;
  images: {
    url: string;
    type: string;
  }[];
  nodeId: string;
  projectId: string;
};

export const generateVideoAction = async ({
  modelId,
  prompt,
  images,
  nodeId,
  projectId,
}: GenerateVideoActionProps): Promise<
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
    const model = videoModels
      .flatMap((model) => model.models)
      .find((model) => model.id === modelId);

    if (!model) {
      throw new Error('Model not found');
    }

    let videoArrayBuffer: ArrayBuffer | undefined;
    let firstFrameImage = images.at(0)?.url;

    if (firstFrameImage && process.env.NODE_ENV !== 'production') {
      const response = await fetch(firstFrameImage);
      const blob = await response.blob();
      const uint8Array = new Uint8Array(await blob.arrayBuffer());
      const base64 = Buffer.from(uint8Array).toString('base64');

      firstFrameImage = `data:${images.at(0)?.type};base64,${base64}`;
    }

    if (model.id.startsWith('runway-')) {
      videoArrayBuffer = await generateRunwayVideo({
        model,
        prompt,
        image: firstFrameImage,
      });
    } else if (model.id.startsWith('minimax-')) {
      videoArrayBuffer = await generateMinimaxVideo({
        model,
        prompt,
        image: firstFrameImage,
      });
    } else if (model.id.startsWith('luma-')) {
      videoArrayBuffer = await generateLumaVideo({
        model,
        prompt,
        image: firstFrameImage,
      });
    } else {
      throw new Error('Invalid model');
    }

    // Credits disabled in debug

    // Storage disabled in debug; inline data URL
    const base64 = Buffer.from(new Uint8Array(videoArrayBuffer!)).toString(
      'base64'
    );
    const url = `data:video/mp4;base64,${base64}`;

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
        type: 'video/mp4',
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
