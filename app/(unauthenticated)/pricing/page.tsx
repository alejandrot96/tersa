import { currentUser, currentUserProfile } from '@/lib/auth';
import { env } from '@/lib/env';
import type { Metadata } from 'next';
import { Hero } from './components/hero';

export const metadata: Metadata = {
  title: 'Tersa | Pricing',
  description: 'Choose a plan to get access to all features.',
};

const PricingPage = async () => {
  const user = await currentUser();
  let currentPlan: 'hobby' | 'pro' | undefined;

  if (user) {
    const profile = await currentUserProfile();

    if (profile && typeof profile === 'object' && 'productId' in profile) {
      const typedProfile = profile as { productId: string };
      // Stripe env vars disabled in debug build
      const stripeHobbyProductId = process.env.STRIPE_HOBBY_PRODUCT_ID;
      const stripeProProductId = process.env.STRIPE_PRO_PRODUCT_ID;
      
      if (stripeHobbyProductId && typedProfile.productId === stripeHobbyProductId) {
        currentPlan = 'hobby';
      } else if (stripeProProductId && typedProfile.productId === stripeProProductId) {
        currentPlan = 'pro';
      }
    }
  }

  return <Hero currentPlan={currentPlan} authenticated={Boolean(user)} />;
};

export default PricingPage;
