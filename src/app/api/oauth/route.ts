import { createAdminClient } from '@/lib/server/appwrite';
import { NextResponse } from 'next/server';
import { OAuthProvider } from 'node-appwrite';

export async function GET(request: Request) {
  const { account } = await createAdminClient();

  const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `http://localhost:3000/google-oauth`, `http://localhost:3000/signup`);
  const url = new URL(request.url);

  return NextResponse.redirect(redirectUrl);
}
