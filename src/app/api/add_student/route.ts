import { NextResponse } from 'next/server';
import { createSubject } from '@/lib/actions/createSubject';
import { addStudent } from '@/lib/actions/addStudent';

export async function POST(req: Request) {
  const data = await req.json();

  const result = await addStudent(data);
  console.log('🚀 ~ POST ~ result:', data);

  return NextResponse.json(result);
}
