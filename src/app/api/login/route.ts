import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/server/appwrite';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(email as string, password as string);

    const cookieStore = cookies();
    (await cookieStore).set('myproject-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
