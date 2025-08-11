// Auth disabled in debug build
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  // Auth disabled in debug build - redirect to home
  return NextResponse.redirect(`${origin}${next}`);
}
