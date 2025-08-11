import { parseError } from '@/lib/error/parse';
import { textModels } from '@/lib/models/text';
import { streamObject } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limiting disabled in debug build

export const POST = async (req: Request) => {
  // Rate limiting disabled for debug build

  const context = await req.json();
  const modelId = req.headers.get('tersa-model');
  const language = req.headers.get('tersa-language');

  if (!modelId) {
    return new Response('Model not found', { status: 400 });
  }

  const model = textModels
    .flatMap((model) => model.models)
    .find(({ id }) => id === modelId);

  if (!model) {
    return new Response('Model not found', { status: 400 });
  }

  const result = streamObject({
    model: model.model,
    schema: z.object({
      text: z.string(),
      language: z.string(),
    }),
    prompt: [
      '------ System ------',
      `Output the code in the language specified: ${language ?? 'javascript'}`,
      'If the user specifies an output language in the context below, ignore it.',
      'Respond with the code only, no other text.',
      '------ User ------',
      context,
    ].join('\n'),
    onFinish: async () => {
      // Credits are not tracked in the personal version
    },
  });

  return result.toTextStreamResponse();
};
