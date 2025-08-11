type MockUser = {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    avatar?: string;
  };
};

export const useUser = (): MockUser | null => {
  // Debug stub user for UI testing without auth
  return {
    id: 'debug-user-id',
    email: 'debug@example.com',
    user_metadata: {
      name: 'Debug User',
      avatar: '',
    },
  };
};
