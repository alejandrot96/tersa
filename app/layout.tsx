import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { mono, sans, serif } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { PostHogProvider } from '@/providers/posthog-provider';
import { ThemeProvider } from '@/providers/theme';
import { Analytics } from '@vercel/analytics/next';
import { ClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        sans.variable,
        serif.variable,
        mono.variable,
        sans.className,
        'bg-background text-foreground antialiased'
      )}
    >
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
            card: 'bg-background shadow-none',
            headerTitle: 'text-foreground',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton: 'border-border',
            socialButtonsBlockButtonText: 'text-foreground',
            formFieldInput: 'bg-background border-border text-foreground',
            formFieldLabel: 'text-foreground',
          },
        }}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster className="z-[99999999]" />
          </ThemeProvider>
          <Analytics />
        </PostHogProvider>
      </ClerkProvider>
    </body>
  </html>
);

export default RootLayout;
