export const tailwindColors = {
  red: {
    name: 'Red',
    light: 'oklch(0.627 0.258 29)',
    dark: 'oklch(0.627 0.258 29)',
  },
  orange: {
    name: 'Orange',
    light: 'oklch(0.705 0.218 60)',
    dark: 'oklch(0.705 0.218 60)',
  },
  amber: {
    name: 'Amber',
    light: 'oklch(0.803 0.194 83)',
    dark: 'oklch(0.803 0.194 83)',
  },
  yellow: {
    name: 'Yellow',
    light: 'oklch(0.854 0.191 96)',
    dark: 'oklch(0.854 0.191 96)',
  },
  lime: {
    name: 'Lime',
    light: 'oklch(0.768 0.196 120)',
    dark: 'oklch(0.768 0.196 120)',
  },
  green: {
    name: 'Green',
    light: 'oklch(0.696 0.170 162)',
    dark: 'oklch(0.696 0.170 162)',
  },
  emerald: {
    name: 'Emerald',
    light: 'oklch(0.60 0.13 163)',
    dark: 'oklch(0.60 0.13 163)',
  },
  teal: {
    name: 'Teal',
    light: 'oklch(0.627 0.132 180)',
    dark: 'oklch(0.627 0.132 180)',
  },
  cyan: {
    name: 'Cyan',
    light: 'oklch(0.696 0.131 191)',
    dark: 'oklch(0.696 0.131 191)',
  },
  sky: {
    name: 'Sky',
    light: 'oklch(0.706 0.156 213)',
    dark: 'oklch(0.706 0.156 213)',
  },
  blue: {
    name: 'Blue',
    light: 'oklch(0.627 0.240 264)',
    dark: 'oklch(0.627 0.240 264)',
  },
  indigo: {
    name: 'Indigo',
    light: 'oklch(0.570 0.196 263)',
    dark: 'oklch(0.570 0.196 263)',
  },
  violet: {
    name: 'Violet',
    light: 'oklch(0.627 0.225 273)',
    dark: 'oklch(0.627 0.225 273)',
  },
  purple: {
    name: 'Purple',
    light: 'oklch(0.627 0.265 304)',
    dark: 'oklch(0.627 0.265 304)',
  },
  fuchsia: {
    name: 'Fuchsia',
    light: 'oklch(0.696 0.296 328)',
    dark: 'oklch(0.696 0.296 328)',
  },
  pink: {
    name: 'Pink',
    light: 'oklch(0.716 0.214 347)',
    dark: 'oklch(0.716 0.214 347)',
  },
  rose: {
    name: 'Rose',
    light: 'oklch(0.696 0.203 12)',
    dark: 'oklch(0.696 0.203 12)',
  },
} as const;

export type ColorKey = keyof typeof tailwindColors;

export const getColorValue = (colorKey: ColorKey, theme: 'light' | 'dark' = 'light') => {
  return tailwindColors[colorKey][theme];
};