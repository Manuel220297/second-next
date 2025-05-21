import { NextResponse } from 'next/server';
import { createStudentAccount } from '@/lib/actions/createStudentAccount';
import { createTeacherAccount } from '@/lib/actions/createTeacherAccount';
import { createPost } from '@/lib/actions/createPost';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const subjectId = formData.get('subjectId') as string;
  const authorId = formData.get('authorId') as string;
  let pdfurl: string | null = null;
  if (formData.get('pdfurl')) {
    pdfurl = formData.get('pdfurl') as string;
  }
  const pdfile = formData.get('pdfile') as File;

  if (pdfurl) {
    const result = await createPost({
      title,
      content,
      subjectId,
      authorId,
      pdfurl,
    });
    return NextResponse.json(result);
  }

  const result = await createPost({
    title,
    content,
    subjectId,
    authorId,
    pdfile,
  });

  return NextResponse.json(result);
}
