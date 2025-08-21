import { ImagePrimitive } from './primitive';
import { ImageTransform } from './transform';

export type ImageNodeProps = {
  type: string;
  data: {
    source: 'primitive' | 'transform';
    content?: {
      url: string;
      type: string;
    };
    generated?: {
      url: string;
      type: string;
    };
    size?: string;
    width?: number;
    height?: number;
    updatedAt?: string;
    model?: string;
    description?: string;
    instructions?: string;
  };
  id: string;
};

export const ImageNode = (props: ImageNodeProps) => {
  const Component =
    props.data.source === 'primitive' ? ImagePrimitive : ImageTransform;

  // Get model label from model ID
  const getModelLabel = (modelId?: string) => {
    if (!modelId) return '';
    
    // Simple mapping for common model IDs to readable names
    const modelMap: Record<string, string> = {
      'google-imagen-3.0-generate-002': 'Google Imagen 3',
      'google-imagen-4.0-generate-001': 'Google Imagen 4',
      'google-imagen-4.0-fast-generate-001': 'Google Imagen 4 Fast',
      'google-imagen-4.0-ultra-generate-001': 'Google Imagen 4 Ultra',
      'openai-dall-e-3': 'OpenAI DALL-E 3',
      'openai-dall-e-2': 'OpenAI DALL-E 2',
      'openai-gpt-image-1-high': 'GPT Image 1 High',
      'openai-gpt-image-1-standard': 'GPT Image 1 Standard',
      'openai-gpt-image-1-low': 'GPT Image 1 Low',
      'xai-grok-2-image': 'xAI Grok',
      'amazon-nova-canvas-v1': 'Amazon Nova Canvas'
    };
    
    return modelMap[modelId] || modelId;
  };

  const title = props.data.generated?.url && props.data.model
    ? `Image (${getModelLabel(props.data.model)})`
    : 'Image';

  return <Component {...props} title={title} />;
};
