'use server';

import { createAdminClient } from '../server/appwrite';

interface AddStudentData {
  documentId: string;
  students: string;
}

export async function addStudent(data: AddStudentData) {
  const { databases } = await createAdminClient();

  try {
    const doc = await databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SUBJECTS, data.documentId);

    const existingStudents: string[] = doc.students || [];
    if (!existingStudents.includes(data.students)) {
      existingStudents.push(data.students);
    }
    const result = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SUBJECTS, //  Collection ID
      data.documentId,
      {
        students: existingStudents,
      }
    );

    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document creation failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
