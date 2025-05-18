'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '../server/appwrite';
import { Subject } from './getSubjects';

export interface Material {
  authorId: string;
  material_id?: string;
  subjectId?: string;
  title: string;
  content: string;
  subjects?: Subject;
  pdfile?: string;
}

function generateCustomId(title: string) {
  const part1 = title.substring(0, 10).toLowerCase().replace(/\s+/g, '');
  const unique = Math.random().toString(36).substring(2, 7);
  return `${part1}-${unique}`;
}

export async function createPost(data: Material) {
  const { databases } = await createAdminClient();

  try {
    const documentId = generateCustomId(data.title);

    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MATERIALS, //  Collection ID
      documentId,
      {
        authorId: data.authorId,
        material_id: documentId,
        title: data.title,
        content: data.content,
        subjects: data.subjectId,
        pdfile: data.pdfile,
      }
    );
    console.log('🛡🛡', data);
    // revalidatePath(`/subjects/${data.subjectId}/learn`, 'page');
    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document creation failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
