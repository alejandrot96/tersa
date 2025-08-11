// Auth disabled in debug build
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get('next') ?? '/';

  // Auth disabled in debug build - redirect to home
  redirect(next);
}
