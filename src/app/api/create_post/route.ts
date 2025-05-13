import { NextResponse } from 'next/server';
import { createStudentAccount } from '@/lib/actions/createStudentAccount';
import { createTeacherAccount } from '@/lib/actions/createTeacherAccount';
import { createPost } from '@/lib/actions/createPost';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const data = await req.json();

  const result = await createPost(data);

  return NextResponse.json(result);
}
