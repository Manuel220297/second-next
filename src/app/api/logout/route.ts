import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionClient } from '@/lib/server/appwrite';

export async function POST() {
  const { account } = await createSessionClient();

  const cookieStore = cookies();
  (await cookieStore).delete('myproject-session');
  await account.deleteSession('current');

  return NextResponse.json({ message: 'Logged out' });
}
