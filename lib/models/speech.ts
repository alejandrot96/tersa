import { openai } from '@ai-sdk/openai';
import type { SpeechModel } from 'ai';
import { ElevenLabsIcon, OpenAiIcon } from '../icons';

const million = 1000000;
const thousand = 1000;

export const speechModels: {
  label: string;
  models: {
    icon: typeof OpenAiIcon;
    id: string;
    label: string;
    model: SpeechModel;
    voices: string[];
    getCost: (tokens: number) => number;
    default?: boolean;
    voiceStyle?: boolean;
  }[];
}[] = [
  {
    label: 'OpenAI',
    models: [
      {
        icon: OpenAiIcon,
        id: 'openai-tts-1',
        label: 'TTS-1',
        model: openai.speech('tts-1'),
        getCost: (characters: number) => (characters / million) * 15,
        voices: [
          'alloy',
          'ash',
          'ballad',
          'coral',
          'echo',
          'fable',
          'nova',
          'onyx',
          'sage',
          'shimmer',
        ],
      },
      {
        icon: OpenAiIcon,
        id: 'openai-tts-1-hd',
        label: 'TTS-1-HD',
        model: openai.speech('tts-1-hd'),
        default: true,
        getCost: (characters: number) => (characters / million) * 30,
        voices: [
          'alloy',
          'ash',
          'ballad',
          'coral',
          'echo',
          'fable',
          'nova',
          'onyx',
          'sage',
          'shimmer',
        ],
      },
      {
        icon: OpenAiIcon,
        id: 'openai-gpt-4o-mini-tts',
        label: 'GPT-4o Mini TTS',
        model: openai.speech('gpt-4o-mini-tts'),
        getCost: (characters: number) => (characters / million) * 60,
        voiceStyle: true,
        voices: [
          'alloy',
          'ash',
          'ballad',
          'coral',
          'echo',
          'fable',
          'nova',
          'onyx',
          'sage',
          'shimmer',
          'verse',
        ],
      },
    ],
  },
  {
    label: 'ElevenLabs',
    models: [
      {
        icon: ElevenLabsIcon,
        id: 'elevenlabs-eleven-turbo-v2',
        label: 'Eleven Turbo v2',
        model: {} as SpeechModel, // Custom implementation in speech action
        getCost: (characters: number) => (characters / thousand) * 0.3,
        voiceStyle: true,
        voices: [
          'rachel',
          'domi',
          'bella',
          'antoni',
          'elli',
          'josh',
          'arnold',
          'adam',
          'sam',
        ],
      },
    ],
  },
];
