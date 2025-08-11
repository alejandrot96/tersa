import { Canvas } from '@/components/canvas';
import { sampleEdges, sampleNodes, sampleViewport } from '@/lib/demo';

export const Demo = () => (
  <section className="container mx-auto px-4 sm:px-8">
    <div className="rounded-lg bg-gradient-to-b from-primary to-border p-px">
      <div className="aspect-video overflow-hidden rounded-[9px]">
        <Canvas
          data={{
            createdAt: new Date(),
            id: 'demo',
            name: 'Demo Project',
            transcriptionModel: 'gpt-4o-mini-transcribe',
            visionModel: 'gpt-4.1-nano',
            systemPrompt: null,
            updatedAt: null,
            image: null,
            content: {
              nodes: sampleNodes,
              edges: sampleEdges,
              viewport: sampleViewport,
            },
          }}
          canvasProps={{
            panOnScroll: false,
            panOnDrag: true,
            zoomOnScroll: false,
            preventScrolling: false,
          }}
        />
      </div>
    </div>
  </section>
);
