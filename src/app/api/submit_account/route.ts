import { NextResponse } from 'next/server';
import { submitAccount } from '@/lib/actions/submitAccount';

export async function POST(req: Request) {
  const data = await req.json();

  const result = await submitAccount(data);

  return NextResponse.json(result);
}
