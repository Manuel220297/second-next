import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Grade } from './getGrades';

export interface Teacher extends Models.Document {
  userId?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  phone?: string;
  avatar?: string;
  wallpaper?: string;
  grades?: Grade[];
}
export default async function getTeacher(userId: string): Promise<Models.DocumentList<Teacher>> {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments('student-project', 'teacherCollection');

  const filteredDocuments = documents.filter((doc) => doc.userId === userId);

  // console.log('This are the documents', documents);
  return { documents: filteredDocuments } as Models.DocumentList<Teacher>;
}
