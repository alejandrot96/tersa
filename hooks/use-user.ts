import { useUser as useClerkUser } from '@clerk/nextjs';

type User = {
  id: string;
  email: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
};

export const useUser = (): User | null => {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    fullName: user.fullName || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    imageUrl: user.imageUrl || '',
  };
};
