import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, name } = data;
    const { account } = await createAdminClient();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await account.create(ID.unique(), email as string, password as string, name as string);
    const session = await account.createEmailPasswordSession(email as string, password as string);

    (await cookies()).set('myproject-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return NextResponse.redirect(new URL('/signup/account', req.url));
  } catch (error) {
    return NextResponse.json({ failed: error });
  }
}
