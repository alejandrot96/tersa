'use server';

import { env } from './env';

/**
 * Check if video generation features are available
 * based on environment variables
 */
export async function getVideoAvailability() {
  return !!(env.RUNWAYML_API_SECRET || env.LUMAAI_API_KEY);
}

/**
 * Get all feature flags for the application
 */
export async function getFeatureFlags() {
  return {
    videoEnabled: await getVideoAvailability(),
  };
}