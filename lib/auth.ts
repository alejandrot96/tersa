import { auth } from '@clerk/nextjs/server';
import { database } from './database';

export const currentUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }
    
    // In Clerk v6, we need to use a different approach to get user details
    // For now, return just the user ID
    return { id: userId };
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const currentUserProfile = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }
    
    // In Clerk v6, we need to use a different approach to get user details
    // For now, return just the user ID
    return { id: userId };
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    return null;
  }
};

export const getSubscribedUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    // In Clerk v6, we need to use a different approach to get user details
    // For now, return just the user ID
    return { id: userId };
  } catch (error) {
    console.error('Error fetching subscribed user:', error);
    throw new Error('Failed to fetch user data');
  }
};
