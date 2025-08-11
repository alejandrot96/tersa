// import { getSubscribedUser } from '@/lib/auth';
// import { parseError } from '@/lib/error/parse';
import { database } from '@/lib/database';
import { textModels } from '@/lib/models/text';
// import { createRateLimiter, slidingWindow } from '@/lib/rate-limit';
// import { trackCreditUsage } from '@/lib/stripe';
import { projects } from '@/schema';
import { streamText } from 'ai';
import { eq } from 'drizzle-orm';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limiting disabled in debug
const rateLimiter: any = null;

export const POST = async (req: Request) => {
  // Auth disabled in debug; allow all requests

  // Apply rate limiting
  // Rate limiting disabled in debug build

  const { messages, modelId, projectId } = (await req.json()) as { 
    messages: any; 
    modelId: string;
    projectId?: string;
  };

  if (typeof modelId !== 'string') {
    return new Response('Model must be a string', { status: 400 });
  }

  const model = textModels
    .flatMap((m) => m.models)
    .find((m) => m.id === modelId);

  if (!model) {
    return new Response('Invalid model', { status: 400 });
  }

  // Get custom system prompt if projectId is provided
  let systemPrompt = [
    "You are a helpful assistant that synthesizes content based on the user's prompts.",
    'The user will provide instructions; and may provide text, audio transcriptions, or images (and their descriptions) as context.',
    "You will then synthesize the content based on the user's instructions and the context provided.",
    'The output should be a concise summary of the content, no more than 100 words.',
  ].join('\n');

  if (projectId) {
    try {
      const project = await database
        .select({ systemPrompt: projects.systemPrompt })
        .from(projects)
        .where(eq(projects.id, projectId))
        .limit(1);

      if (project[0]?.systemPrompt) {
        systemPrompt = project[0].systemPrompt;
      }
    } catch (error) {
      // Fall back to default system prompt if there's an error
      console.error('Error fetching project system prompt:', error);
    }
  }

  const result = streamText({
    model: model.model,
    system: systemPrompt,
    messages,
    onFinish: async () => {
      // Credits disabled in debug
    },
  });

  return result.toDataStreamResponse();
};
