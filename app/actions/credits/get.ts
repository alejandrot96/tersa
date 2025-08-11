'use server';

// Debug stub: unlimited credits without auth/stripe
export const getCredits = async (): Promise<{ credits: number } | { error: string }> => {
  return { credits: 999999 };
};

