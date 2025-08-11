import { Cormorant_Upright, IBM_Plex_Mono, Outfit } from 'next/font/google';

export const sans = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
});

export const serif = Cormorant_Upright({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});
