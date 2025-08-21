export const parseError = (error: unknown) => {
  if (typeof error === 'string') {
    // Filter out base64 strings from error messages
    if (error.includes('base64') && error.length > 500) {
      return 'An error occurred during image processing';
    }
    return error;
  }

  if (error instanceof Error) {
    // Filter out base64 strings from error messages
    if (error.message.includes('base64') && error.message.length > 500) {
      return 'An error occurred during image processing';
    }
    return error.message;
  }

  return 'An error occurred';
};
