'use client';

import { type ColorKey, tailwindColors } from '@/lib/colors';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorSelectorProps {
  value: ColorKey;
  onChange: (color: ColorKey) => void;
  className?: string;
}

export const ColorSelector = ({ value, onChange, className }: ColorSelectorProps) => {
  return (
    <div className={cn("grid grid-cols-8 gap-1", className)}>
      {Object.entries(tailwindColors).map(([colorKey, color]) => (
        <button
          key={colorKey}
          type="button"
          className={cn(
            "relative h-6 w-6 rounded-full border transition-all",
            "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
            "hover:scale-110",
            value === colorKey 
              ? "border-foreground shadow-sm scale-110" 
              : "border-muted-foreground/20 hover:border-muted-foreground/40"
          )}
          style={{ backgroundColor: color.light }}
          onClick={() => onChange(colorKey as ColorKey)}
          title={color.name}
        >
          {value === colorKey && (
            <CheckIcon 
              size={10} 
              className="absolute inset-0 m-auto text-white drop-shadow-sm" 
            />
          )}
        </button>
      ))}
    </div>
  );
};