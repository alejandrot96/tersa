'use client';

import { type ColorKey, getColorValue } from '@/lib/colors';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface ProjectColorProviderProps {
  accentColor: ColorKey;
  children: React.ReactNode;
}

export const ProjectColorProvider = ({ accentColor, children }: ProjectColorProviderProps) => {
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    const colorValue = getColorValue(accentColor, theme);
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--primary', colorValue);
    
    // Also update the Tailwind CSS variables
    document.documentElement.style.setProperty('--color-primary', `var(--primary)`);
    
    // Cleanup function to reset to default if component unmounts
    return () => {
      // Reset to default emerald color
      const defaultColor = getColorValue('emerald', theme);
      document.documentElement.style.setProperty('--primary', defaultColor);
    };
  }, [accentColor, resolvedTheme]);

  return <>{children}</>;
};