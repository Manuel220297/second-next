'use server';

import { createAdminClient } from '../server/appwrite';
import { Student } from './getStudent';
import { Subject } from './getSubjects';

export interface CreateGradesData {
  students: string;
  subjects: string;
}

function generateCustomId() {
  const unique = Math.random().toString(36).substring(2, 7);
  return `${unique}`;
}

export async function createGrades(data: CreateGradesData) {
  const { databases } = await createAdminClient();

  try {
    const documentId = generateCustomId();

    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GRADES, //  Collection ID
      documentId,
      {
        students: data.students,
        subjects: data.subjects,
      }
    );

    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document creation failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
