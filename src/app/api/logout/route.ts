import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionClient } from '@/lib/server/appwrite';

export async function POST() {
  const cookieStore = cookies();
  const session = (await cookieStore).get('myproject-session');

  if (!session) {
    return NextResponse.json({ message: 'Logged out with no session' });
  }

  const { account } = await createSessionClient(session?.value);

  const logoutAccount = await account.get();

  console.log('Loggout out account: ', logoutAccount);

  (await cookieStore).delete('myproject-session');

  await account.deleteSession('current');

  return NextResponse.json({ message: 'Logged out' });
}
