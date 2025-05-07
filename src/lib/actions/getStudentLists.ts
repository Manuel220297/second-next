import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Student } from './getStudent';

export default async function getStudentLists(): Promise<Student[]> {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments('student-project', 'studentCollection');

  return documents as Student[];
}
