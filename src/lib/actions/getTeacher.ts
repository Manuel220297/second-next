import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Subject } from './getSubjects';

export interface Teacher extends Models.Document {
  userId?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  phone?: string;
  specialization?: string;
  experience?: string;
  employment_status?: string;
  subjects?: Subject[];
}
export default async function getTeacher(userId: string): Promise<Models.DocumentList<Teacher>> {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TEACHERS);

  const filteredDocuments = documents.filter((doc) => doc.userId === userId);

  // console.log('This are the documents', documents);
  return { documents: filteredDocuments } as Models.DocumentList<Teacher>;
}
