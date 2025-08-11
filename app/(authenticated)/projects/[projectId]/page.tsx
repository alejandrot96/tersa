import { Canvas } from '@/components/canvas';
import { ProjectColorProvider } from '@/components/project-color-provider';
import { TopLeft } from '@/components/top-left';
import { TopRight } from '@/components/top-right';
import { database } from '@/lib/database';
import { getFeatureFlags } from '@/lib/features';
import type { ColorKey } from '@/lib/colors';
import { FeatureFlagsProvider } from '@/providers/feature-flags';
import { ProjectProvider } from '@/providers/project';
import { projects } from '@/schema';
import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Tersa',
  description: 'Create and share AI workflows',
};

export const maxDuration = 800; // 13 minutes

type ProjectProps = {
  params: Promise<{
    projectId: string;
  }>;
};

const Project = async ({ params }: ProjectProps) => {
  const { projectId } = await params;

  const [projectResults, featureFlags] = await Promise.all([
    database.select().from(projects).where(eq(projects.id, projectId)),
    getFeatureFlags(),
  ]);

  const project = projectResults[0];

  if (!project) {
    notFound();
  }

  return (
    <ProjectColorProvider accentColor={(project.accentColor as ColorKey) || 'emerald'}>
      <div className="h-screen w-screen">
        <FeatureFlagsProvider features={featureFlags}>
          <ProjectProvider data={project}>
            <Canvas data={project} />
          </ProjectProvider>
          <Suspense fallback={null}>
            <TopLeft id={projectId} />
          </Suspense>
          <Suspense fallback={null}>
            <TopRight id={projectId} />
          </Suspense>
        </FeatureFlagsProvider>
      </div>
    </ProjectColorProvider>
  );
};

export default Project;
