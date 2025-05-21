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
  pdfile?: File | null;
  pdfurl?: string;
}

function generateCustomId(title: string) {
  const part1 = title.substring(0, 10).toLowerCase().replace(/\s+/g, '');
  const unique = Math.random().toString(36).substring(2, 7);
  return `${part1}-${unique}`;
}

export async function createPost(data: Material) {
  const { databases, storages } = await createAdminClient();

  try {
    const documentId = generateCustomId(data.title);

    let pdfID: string;
    pdfID = '';

    const pdfile = data.pdfile;
    console.log('🚀 ~ createPost ~ pdfile:', pdfile);

    if (pdfile && pdfile.size > 0) {
      try {
        const response = await storages.createFile(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_FILES, String(new Date().getTime()), pdfile);
        console.log('🚀 ~ createPost ~ response:', response);
        pdfID = response.$id;
        if (!pdfID.includes('http://') && !pdfID.includes('https://')) {
          pdfID = 'http://localhost/v1/storage/buckets/fileBucket/files/' + pdfID + '/view?project=6826ba610030df6a2362';
        }
      } catch (error) {
        console.log('Error uploading pdf', error);
        return {
          error: 'Error uploading pdf' + error,
        };
      }
    } else {
      console.log('❌ No pdf file detected', pdfID, pdfile);
    }

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
        pdfile: pdfID || data.pdfurl,
      }
    );

    revalidatePath(`/subjects/${data.subjectId}/learn`, 'layout');
    console.log('💢', data);
    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document creation failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
