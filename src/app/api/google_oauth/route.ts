import { createAdminClient } from '@/lib/server/appwrite';
import { NextResponse } from 'next/server';
import { OAuthProvider } from 'node-appwrite';

export async function GET(request: Request) {
  const { account } = await createAdminClient();

  const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `https://bd6v1hkx-3000.asse.devtunnels.ms/oauth-callback`, `https://bd6v1hkx-3000.asse.devtunnels.ms/signup`);
  const url = new URL(request.url);

  return NextResponse.redirect(redirectUrl);
}
