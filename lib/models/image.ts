import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import type { ImageModel } from 'ai';
import { GoogleIcon, OpenAiIcon } from '../icons';

const million = 1000000;

export type ImageSize = `${number}x${number}`;

export const imageModels: {
  label: string;
  models: {
    icon: typeof XaiIcon;
    id: string;
    label: string;
    model: ImageModel;
    sizes?: ImageSize[];
    getCost: (props?: {
      textInput?: number;
      imageInput?: number;
      output?: number;
      size?: string;
    }) => number;
    supportsEdit?: boolean;
    disabled?: boolean;
    providerOptions?: Record<string, Record<string, string>>;
    qualityOptions?: string[];
    priceIndicator?: 'lowest' | 'low' | 'high' | 'highest';
    default?: boolean;
  }[];
}[] = [
  {
    label: 'OpenAI',
    models: [
      {
        icon: OpenAiIcon,
        id: 'openai-gpt-image-1-high',
        label: 'GPT Image 1 High',
        model: openai.image('gpt-image-1'),
        supportsEdit: true,
        sizes: ['1024x1024', '1024x1536', '1536x1024'],
        default: true,
        providerOptions: {
          openai: {
            quality: 'high',
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        priceIndicator: 'high',

        // Input (Text): https://platform.openai.com/docs/pricing#latest-models
        // Input (Image): https://platform.openai.com/docs/pricing#text-generation
        // Output: https://platform.openai.com/docs/pricing#image-generation
        getCost: (props) => {
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.167,
            '1024x1536': 0.25,
            '1536x1024': 0.25,
          };

          if (!props) {
            throw new Error('Props are required');
          }

          if (typeof props.size !== 'string') {
            throw new Error('Size is required');
          }

          if (typeof props.output !== 'number') {
            throw new Error('Output is required');
          }

          if (typeof props.textInput !== 'number') {
            throw new Error('Text input is required');
          }

          if (typeof props.imageInput !== 'number') {
            throw new Error('Image input is required');
          }

          const { textInput, imageInput, output, size } = props;
          const textInputCost = textInput ? (textInput / million) * 5 : 0;
          const imageInputCost = imageInput ? (imageInput / million) * 10 : 0;
          const outputCost = (output / million) * priceMap[size as ImageSize];

          return textInputCost + imageInputCost + outputCost;
        },
      },
      {
        icon: OpenAiIcon,
        id: 'openai-gpt-image-1-standard',
        label: 'GPT Image 1 Standard',
        model: openai.image('gpt-image-1'),
        supportsEdit: true,
        sizes: ['1024x1024', '1024x1536', '1536x1024'],
        providerOptions: {
          openai: {
            quality: 'standard',
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        priceIndicator: 'low',

        // Input (Text): https://platform.openai.com/docs/pricing#latest-models
        // Input (Image): https://platform.openai.com/docs/pricing#text-generation
        // Output: https://platform.openai.com/docs/pricing#image-generation
        getCost: (props) => {
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.125,
            '1024x1536': 0.1875,
            '1536x1024': 0.1875,
          };

          if (!props) {
            throw new Error('Props are required');
          }

          if (typeof props.size !== 'string') {
            throw new Error('Size is required');
          }

          if (typeof props.output !== 'number') {
            throw new Error('Output is required');
          }

          if (typeof props.textInput !== 'number') {
            throw new Error('Text input is required');
          }

          if (typeof props.imageInput !== 'number') {
            throw new Error('Image input is required');
          }

          const { textInput, imageInput, output, size } = props;
          const textInputCost = textInput ? (textInput / million) * 5 : 0;
          const imageInputCost = imageInput ? (imageInput / million) * 10 : 0;
          const outputCost = (output / million) * priceMap[size as ImageSize];

          return textInputCost + imageInputCost + outputCost;
        },
      },
      {
        icon: OpenAiIcon,
        id: 'openai-gpt-image-1-low',
        label: 'GPT Image 1 Low',
        model: openai.image('gpt-image-1'),
        supportsEdit: true,
        sizes: ['1024x1024', '1024x1536', '1536x1024'],
        providerOptions: {
          openai: {
            quality: 'low',
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        priceIndicator: 'lowest',

        // Input (Text): https://platform.openai.com/docs/pricing#latest-models
        // Input (Image): https://platform.openai.com/docs/pricing#text-generation
        // Output: https://platform.openai.com/docs/pricing#image-generation
        getCost: (props) => {
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.0835,
            '1024x1536': 0.125,
            '1536x1024': 0.125,
          };

          if (!props) {
            throw new Error('Props are required');
          }

          if (typeof props.size !== 'string') {
            throw new Error('Size is required');
          }

          if (typeof props.output !== 'number') {
            throw new Error('Output is required');
          }

          if (typeof props.textInput !== 'number') {
            throw new Error('Text input is required');
          }

          if (typeof props.imageInput !== 'number') {
            throw new Error('Image input is required');
          }

          const { textInput, imageInput, output, size } = props;
          const textInputCost = textInput ? (textInput / million) * 5 : 0;
          const imageInputCost = imageInput ? (imageInput / million) * 10 : 0;
          const outputCost = (output / million) * priceMap[size as ImageSize];

          return textInputCost + imageInputCost + outputCost;
        },
      },
    ],
  },
  // {
  //   label: 'Fal',
  //   models: [
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/flux/dev',
  //       label: 'Flux Dev',
  //       model: fal.image('fal-ai/flux/dev'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/flux-lora',
  //       label: 'Flux Lora',
  //       model: fal.image('fal-ai/flux-lora'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/fast-sdxl',
  //       label: 'Fast SDXL',
  //       model: fal.image('fal-ai/fast-sdxl'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/flux-pro/v1.1-ultra',
  //       label: 'Flux Pro Ultra',
  //       model: fal.image('fal-ai/flux-pro/v1.1-ultra'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/ideogram/v2',
  //       label: 'Ideogram v2',
  //       model: fal.image('fal-ai/ideogram/v2'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/recraft-v3',
  //       label: 'Recraft v3',
  //       model: fal.image('fal-ai/recraft-v3'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/stable-diffusion-3.5-large',
  //       label: 'SD 3.5 Large',
  //       model: fal.image('fal-ai/stable-diffusion-3.5-large'),
  //     },
  //     {
  //       icon: FalIcon,
  //       id: 'fal-ai/hyper-sdxl',
  //       label: 'Hyper SDXL',
  //       model: fal.image('fal-ai/hyper-sdxl'),
  //     },
  //   ],
  // },
  // {
  //   label: 'DeepInfra',
  //   models: [
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'stabilityai/sd3.5',
  //       label: 'SD 3.5',
  //       model: deepinfra.image('stabilityai/sd3.5'),
  //     },
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'black-forest-labs/FLUX-1.1-pro',
  //       label: 'FLUX 1.1 Pro',
  //       model: deepinfra.image('black-forest-labs/FLUX-1.1-pro'),
  //     },
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'black-forest-labs/FLUX-1-schnell',
  //       label: 'FLUX 1 Schnell',
  //       model: deepinfra.image('black-forest-labs/FLUX-1-schnell'),
  //     },
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'black-forest-labs/FLUX-1-dev',
  //       label: 'FLUX 1 Dev',
  //       model: deepinfra.image('black-forest-labs/FLUX-1-dev'),
  //     },
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'black-forest-labs/FLUX-pro',
  //       label: 'FLUX Pro',
  //       model: deepinfra.image('black-forest-labs/FLUX-pro'),
  //     },
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'stabilityai/sd3.5-medium',
  //       label: 'SD 3.5 Medium',
  //       model: deepinfra.image('stabilityai/sd3.5-medium'),
  //     },
  //     {
  //       icon: DeepinfraIcon,
  //       id: 'stabilityai/sdxl-turbo',
  //       label: 'SDXL Turbo',
  //       model: deepinfra.image('stabilityai/sdxl-turbo'),
  //     },
  //   ],
  // },
  // {
  //   label: 'Replicate',
  //   models: [
  //     {
  //       icon: ReplicateIcon,
  //       id: 'black-forest-labs/flux-schnell',
  //       label: 'Flux Schnell',
  //       model: replicate.image('black-forest-labs/flux-schnell'),
  //     },
  //     {
  //       icon: ReplicateIcon,
  //       id: 'recraft-ai/recraft-v3',
  //       label: 'Recraft v3',
  //       model: replicate.image('recraft-ai/recraft-v3'),
  //     },
  //   ],
  // },
  {
    label: 'Google',
    models: [
      {
        icon: GoogleIcon,
        id: 'google-imagen-3.0-generate-002',
        label: 'Imagen 3.0',
        model: google.image('imagen-3.0-generate-002'),
        sizes: ['1024x1024', '1024x1365', '1365x1024', '1536x1024', '1024x1536'],
        providerOptions: {
          google: {
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        getCost: (props) => {
          if (!props) {
            throw new Error('Props are required');
          }

          const { size } = props;

          if (!size) {
            throw new Error('Size is required');
          }

          // Google Imagen 3.0 pricing (estimated based on typical rates)
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.08,
            '1024x1365': 0.10,
            '1365x1024': 0.10,
            '1024x1536': 0.12,
            '1536x1024': 0.12,
          };

          if (typeof size !== 'string') {
            throw new Error('Size is required');
          }

          if (!priceMap[size as ImageSize]) {
            throw new Error('Size is not supported');
          }

          return priceMap[size as ImageSize];
        },
      },
      {
        icon: GoogleIcon,
        id: 'google-imagen-4.0-generate-001',
        label: 'Imagen 4.0',
        model: google.image('imagen-4.0-generate-001'),
        sizes: ['1024x1024', '1024x1365', '1365x1024', '1536x1024', '1024x1536'],
        providerOptions: {
          google: {
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        getCost: (props) => {
          if (!props) {
            throw new Error('Props are required');
          }

          const { size } = props;

          if (!size) {
            throw new Error('Size is required');
          }

          // Google Imagen 4.0 pricing (estimated based on typical rates)
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.08,
            '1024x1365': 0.10,
            '1365x1024': 0.10,
            '1024x1536': 0.12,
            '1536x1024': 0.12,
          };

          if (typeof size !== 'string') {
            throw new Error('Size is required');
          }

          if (!priceMap[size as ImageSize]) {
            throw new Error('Size is not supported');
          }

          return priceMap[size as ImageSize];
        },
      },
      {
        icon: GoogleIcon,
        id: 'google-imagen-4.0-fast-generate-001',
        label: 'Imagen 4.0 Fast',
        model: google.image('imagen-4.0-fast-generate-001'),
        sizes: ['1024x1024', '1024x1365', '1365x1024', '1536x1024', '1024x1536'],
        providerOptions: {
          google: {
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        priceIndicator: 'low',
        getCost: (props) => {
          if (!props) {
            throw new Error('Props are required');
          }

          const { size } = props;

          if (!size) {
            throw new Error('Size is required');
          }

          // Google Imagen 4.0 Fast pricing (estimated based on typical rates)
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.04,
            '1024x1365': 0.06,
            '1365x1024': 0.06,
            '1024x1536': 0.08,
            '1536x1024': 0.08,
          };

          if (typeof size !== 'string') {
            throw new Error('Size is required');
          }

          if (!priceMap[size as ImageSize]) {
            throw new Error('Size is not supported');
          }

          return priceMap[size as ImageSize];
        },
      },
      {
        icon: GoogleIcon,
        id: 'google-imagen-4.0-ultra-generate-001',
        label: 'Imagen 4.0 Ultra',
        model: google.image('imagen-4.0-ultra-generate-001'),
        sizes: ['1024x1024', '1024x1365', '1365x1024', '1536x1024', '1024x1536', '2048x2048'],
        providerOptions: {
          google: {
            output_format: 'jpeg',
            output_compression: 80,
          },
        },
        priceIndicator: 'highest',
        getCost: (props) => {
          if (!props) {
            throw new Error('Props are required');
          }

          const { size } = props;

          if (!size) {
            throw new Error('Size is required');
          }

          // Google Imagen 4.0 Ultra pricing (estimated based on typical rates)
          const priceMap: Record<ImageSize, number> = {
            '1024x1024': 0.15,
            '1024x1365': 0.20,
            '1365x1024': 0.20,
            '1024x1536': 0.25,
            '1536x1024': 0.25,
            '2048x2048': 0.50,
          };

          if (typeof size !== 'string') {
            throw new Error('Size is required');
          }

          if (!priceMap[size as ImageSize]) {
            throw new Error('Size is not supported');
          }

          return priceMap[size as ImageSize];
        },
      },
    ],
  },
];
