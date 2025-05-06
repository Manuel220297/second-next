import { createAdminClient } from '@/lib/server/appwrite';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Body Secret: ', body.secret);
    console.log('Body UserID: ', body.userId);

    const { account } = await createAdminClient();
    const session = await account.createSession(body.userId!, body.secret!);

    const cookieStore = cookies();
    (await cookieStore).set('myproject-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Unauthorized`, { status: 401 });
  }
}
