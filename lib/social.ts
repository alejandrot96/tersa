import { SiGithub, SiX } from '@icons-pack/react-simple-icons';
// Auth disabled in debug build
// import type { Provider } from '@supabase/supabase-js';

export const socialProviders: {
  name: string;
  icon: typeof SiGithub;
  id: string;
}[] = [
  {
    name: 'Github',
    icon: SiGithub,
    id: 'github',
  },
  {
    name: 'Twitter',
    icon: SiX,
    id: 'twitter',
  },
];
