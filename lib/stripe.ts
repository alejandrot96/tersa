// import Stripe from 'stripe';
import { currentUserProfile } from './auth';
import { env } from './env';

export const stripe: any = {};

const creditValue = 0.005;

export const trackCreditUsage = async () => {
  // Credits disabled in debug
  return;
};
