// import { createAdminClient } from '@/lib/server/appwrite';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function GET(request: any) {
//   const userId = request.nextUrl.searchParams.get('userId');
//   const secret = request.nextUrl.searchParams.get('secret');

//   const { account } = await createAdminClient();
//   const session = await account.createSession(userId, secret);

//   (await cookies()).set('myproject-session', session.secret, {
//     path: '/',
//     httpOnly: true,
//     sameSite: 'strict',
//     secure: true,
//   });

//   return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);
// }

// app/api/auth/google/route.ts
import { createAdminClient } from '@/lib/server/appwrite';
import { NextResponse } from 'next/server';
import { OAuthProvider } from 'node-appwrite';

export async function GET() {
  const { account } = await createAdminClient();

  const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `http://localhost:3000/google-oauth`, `http://localhost:3000/signup`);

  return NextResponse.redirect(redirectUrl);
}
