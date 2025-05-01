import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).delete('myproject-session');

  return NextResponse.json({ message: 'Logged out' });
}
