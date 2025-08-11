import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    DATABASE_URL: z.string().url().min(1),

    // AI SDK
    OPENAI_API_KEY: z.string().min(1).optional(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1).optional(),
    GROQ_API_KEY: z.string().min(1).optional(),
    DEEPSEEK_API_KEY: z.string().min(1).optional(),
    ANTHROPIC_API_KEY: z.string().min(1).optional(),
    XAI_API_KEY: z.string().min(1).optional(),
    AWS_ACCESS_KEY_ID: z.string().min(1).optional(),
    AWS_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    AWS_REGION: z.string().min(1).optional(),
    FAL_API_KEY: z.string().min(1).optional(),
    TOGETHER_AI_API_KEY: z.string().min(1).optional(),

    // Other Models
    MINIMAX_GROUP_ID: z.string().min(1).optional(),
    MINIMAX_API_KEY: z.string().min(1).optional(),
    RUNWAYML_API_SECRET: z.string().min(1).optional(),
    LUMAAI_API_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().min(1).optional(),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    XAI_API_KEY: process.env.XAI_API_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    FAL_API_KEY: process.env.FAL_API_KEY,
    TOGETHER_AI_API_KEY: process.env.TOGETHER_AI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    MINIMAX_GROUP_ID: process.env.MINIMAX_GROUP_ID,
    MINIMAX_API_KEY: process.env.MINIMAX_API_KEY,
    RUNWAYML_API_SECRET: process.env.RUNWAYML_API_SECRET,
    LUMAAI_API_KEY: process.env.LUMAAI_API_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
