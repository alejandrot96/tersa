import { nanoid } from 'nanoid';
// Supabase disabled for debug - using data URLs for local storage
// import { createClient } from './supabase/client';

/**
 * Upload file using data URL encoding for local storage
 * Files are converted to base64 data URLs and stored inline
 */
export const uploadFile = async (
  file: File,
  bucket: 'avatars' | 'files' | 'screenshots',
  filename?: string
): Promise<{ url: string; type: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      const dataUrl = reader.result as string;
      
      resolve({
        url: dataUrl,
        type: file.type,
      });
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    // Convert file to data URL (base64)
    reader.readAsDataURL(file);
  });
};
