'use client';

import { Button } from '@/components/ui/button';
import { handleError } from '@/lib/error/handle';
import { socialProviders } from '@/lib/social';
////import { createClient } from '@/lib/supabase/client';
//import type { Provider } from '@supabase/supabase-js';
import { useState } from 'react';

export const SocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    // Auth disabled in debug build
    setIsLoading(true);

    try {
      // Simulate social login for debug build
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home after simulated auth
      window.location.href = '/';
    } catch (error: unknown) {
      handleError('Error logging in with social provider', error);

      setIsLoading(false);
    }
  };

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: `repeat(${socialProviders.length}, 1fr)`,
      }}
    >
      {socialProviders.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          className="border"
          size="lg"
          disabled={isLoading}
          onClick={() => handleSocialLogin(provider.id)}
        >
          <provider.icon size={16} />
          <span className="sr-only">Continue with {provider.name}</span>
        </Button>
      ))}
    </div>
  );
};
