//
import { PostHogIdentifyProvider } from '@/providers/posthog-provider';
import type { ReactNode } from 'react';

type ProjectsLayoutProps = {
  children: ReactNode;
};

const ProjectsLayout = async ({ children }: ProjectsLayoutProps) => {
  // Auth disabled for debug; always render children
  return <PostHogIdentifyProvider>{children}</PostHogIdentifyProvider>;
};

export default ProjectsLayout;
