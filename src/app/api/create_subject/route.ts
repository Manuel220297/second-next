import { NextResponse } from 'next/server';
import { createSubject } from '@/lib/actions/createSubject';

export async function POST(req: Request) {
  const data = await req.json();

  const result = await createSubject(data);

  return NextResponse.json(result);
}
