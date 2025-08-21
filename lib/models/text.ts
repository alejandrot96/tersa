import { anthropic } from '@ai-sdk/anthropic';
import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { openai } from '@ai-sdk/openai';

import type { LanguageModel } from 'ai';
import {
  AnthropicIcon,
  DeepSeekIcon,
  GoogleIcon,
  GroqIcon,
  OpenAiIcon,
} from '../icons';

export type PriceBracket = 'lowest' | 'low' | 'high' | 'highest';

const million = 1000000;

// Median input cost: 2.7
export const textModels: {
  label: string;
  models: {
    icon: typeof OpenAiIcon;
    id: string;
    label: string;
    model: LanguageModel;
    getCost: ({ input, output }: { input: number; output: number }) => number;
    legacy?: boolean;
    priceIndicator?: PriceBracket;
    disabled?: boolean;
    default?: boolean;
  }[];
}[] = [
  {
    label: 'OpenAI',
    models: [
      {
        icon: OpenAiIcon,
        id: 'openai-gpt-4.1',
        label: 'GPT-4.1',
        model: openai('gpt-4.1'),
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 2;
          const outputCost = (output / million) * 8;

          return inputCost + outputCost;
        },
      },
      {
        icon: OpenAiIcon,
        id: 'openai-gpt-5-mini',
        label: 'GPT-5 Mini',
        model: openai('gpt-5-mini'),
        priceIndicator: 'low',
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 0.5;
          const outputCost = (output / million) * 1.5;

          return inputCost + outputCost;
        },
      },
    ],
  },

  {
    label: 'Anthropic',
    models: [
      {
        icon: AnthropicIcon,
        id: 'anthropic-claude-4',
        label: 'Claude 4',
        model: anthropic('claude-4'),
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 8;
          const outputCost = (output / million) * 24;

          return inputCost + outputCost;
        },
      },
    ],
  },


  {
    label: 'Google',
    models: [
      {
        icon: GoogleIcon,
        id: 'google-gemini-2.5-flash',
        label: 'Gemini 2.5 Flash',
        model: google('gemini-2.5-flash'),
        priceIndicator: 'lowest',
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 0.05;
          const outputCost = (output / million) * 0.15;

          return inputCost + outputCost;
        },
      },
      {
        icon: GoogleIcon,
        id: 'google-gemini-2.5-pro',
        label: 'Gemini 2.5 Pro',
        model: google('gemini-2.5-pro'),
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 2.5;
          const outputCost = (output / million) * 10;

          return inputCost + outputCost;
        },
      },
    ],
  },

  {
    label: 'DeepSeek',
    models: [
      {
        icon: DeepSeekIcon,
        id: 'deepseek-deepseek-chat',
        label: 'DeepSeek Chat',
        model: deepseek('deepseek-chat'),
        priceIndicator: 'lowest',
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 0.27;
          const outputCost = (output / million) * 1.1;

          return inputCost + outputCost;
        },
      },
      {
        icon: DeepSeekIcon,
        id: 'deepseek-deepseek-reasoner',
        label: 'DeepSeek Reasoner',
        model: deepseek('deepseek-reasoner'),
        priceIndicator: 'lowest',
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 0.55;
          const outputCost = (output / million) * 2.19;

          return inputCost + outputCost;
        },
      },
    ],
  },

  // {
  //   label: 'Cerebras',
  //   models: [
  //     {
  //       icon: CerebrasIcon,
  //       id: 'cerebras-llama3.1-8b',
  //       label: 'Llama 3.1 8B',
  //       model: cerebras('llama3.1-8b'),
  //       getCost: ({ input, output }: { input: number; output: number }) => {
  //         const inputCost = (input / million) * 0.1;
  //         const outputCost = (output / million) * 0.1;

  //         return inputCost + outputCost;
  //       },
  //     },
  //     {
  //       icon: CerebrasIcon,
  //       id: 'cerebras-llama3.3-70b',
  //       label: 'Llama 3.3 70B',
  //       model: cerebras('llama3.3-70b'),
  //       getCost: ({ input, output }: { input: number; output: number }) => {
  //         const inputCost = (input / million) * 0.85;
  //         const outputCost = (output / million) * 1.2;

  //         return inputCost + outputCost;
  //       },
  //     },
  //   ],
  // },

  {
    label: 'Groq',
    models: [
      {
        icon: GroqIcon,
        id: 'groq-moonshotai/kimi-k2-instruct',
        label: 'Moonshot AI Kimi K2',
        model: groq('moonshotai/kimi-k2-instruct'),
        default: true,
        priceIndicator: 'lowest',
        getCost: ({ input, output }: { input: number; output: number }) => {
          const inputCost = (input / million) * 0.1;
          const outputCost = (output / million) * 0.1;

          return inputCost + outputCost;
        },
      },
    ],
  },
];
