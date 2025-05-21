import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';

export async function POST(req: Request) {
  const { studentId, subjectId } = await req.json();

  const { databases } = await createAdminClient();

  try {
    // Get current student document
    const student = await databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STUDENTS!, studentId);

    const updatedSubjects = Array.isArray(student.subjects)
      ? Array.from(new Set([...student.subjects, subjectId])) // avoid duplicates
      : [subjectId];

    // Update the student document
    const result = await databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STUDENTS!, studentId, {
      subjects: updatedSubjects,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('[Join Subject Error]', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to join subject' }, { status: 500 });
  }
}
