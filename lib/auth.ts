// Auth disabled for debug
// import { getCredits } from '@/app/actions/credits/get';
// import { profile } from '@/schema';
// import { eq } from 'drizzle-orm';
// import { database } from './database';
// import { env } from './env';
// import { createClient } from './supabase/server';

export const currentUser = async () => {
  return null;
};

export const currentUserProfile = async () => {
  return null;
};

export const getSubscribedUser = async () => {
  throw new Error('Auth is disabled in this debug build.');
};
