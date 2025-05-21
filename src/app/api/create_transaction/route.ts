import { NextResponse } from 'next/server';
import { createSubject } from '@/lib/actions/createSubject';
import { createTransaction } from '@/lib/actions/createTransaction';

export async function POST(req: Request) {
  const data = await req.json();

  const result = await createTransaction(data);

  return NextResponse.json(result);
}
