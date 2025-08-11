'use client';

import { type ReactNode, createContext, useContext } from 'react';

type FeatureFlags = {
  videoEnabled: boolean;
};

type FeatureFlagsContextType = {
  features: FeatureFlags;
};

const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  features: {
    videoEnabled: false,
  },
});

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);

  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }

  return context;
};

export const FeatureFlagsProvider = ({
  children,
  features,
}: {
  children: ReactNode;
  features: FeatureFlags;
}) => (
  <FeatureFlagsContext.Provider value={{ features }}>
    {children}
  </FeatureFlagsContext.Provider>
);