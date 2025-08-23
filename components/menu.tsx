'use client';

import { UserButton } from '@clerk/nextjs';

export const Menu = () => {
  return (
    <div className="flex items-center justify-center p-1">
      <UserButton 
        appearance={{
          elements: {
            userButtonAvatarBox: "w-8 h-8"
          }
        }}
      />
    </div>
  );
};