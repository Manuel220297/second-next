import { createAdminClient, createSessionClient } from '@/lib/server/appwrite';
import { OAuthProvider } from 'node-appwrite';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const { account } = await createAdminClient();
  console.log(account);
  // try {
  const session = await account.createOAuth2Token(OAuthProvider.Google, 'http://localhost:3000', 'http://localhost:3000/fail');

  if (!session) {
    console.log('Session not found');
  }
  console.log(session);

  const cookieStore = cookies();
  (await cookieStore).set('myproject-session', session, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ success: true });
  // } catch (err) {
  //   console.log(err);
  //   return new NextResponse(`Unauthorized`, { status: 401 });
  // }
}
