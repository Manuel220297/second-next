import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Grade } from './getGrades';

export interface Student extends Models.Document {
  userId?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  phone?: string;
  isPayed?: boolean;
  gradeLevel?: string;
  course?: string;
  avatar?: string;
  wallpaper?: string;
  grades?: Grade[];
}
export default async function getStudent(userId: string): Promise<Models.DocumentList<Student>> {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STUDENTS);

  const filteredDocuments = documents.filter((doc) => doc.userId === userId);

  // console.log('This are the documents', documents);
  return { documents: filteredDocuments } as Models.DocumentList<Student>;
}
