import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';

export interface Grade extends Models.Document {
  prelim?: number;
  midterm?: number;
  prefinal?: number;
  final?: number;
  students?: {
    userId?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    location?: string;
    phone?: string;
    isPayed?: boolean;
  };
  subjects?: {
    name?: string;
  };
}
export default async function getGrades(userId: string): Promise<Models.DocumentList<Grade>> {
  const { databases } = await createAdminClient();

  const documents = await databases.listDocuments('student-project', 'gradeCollection');

  const filteredDocuments = documents.documents.filter((doc) => doc.students?.userId === userId);

  console.log(documents);
  return { documents: filteredDocuments } as Models.DocumentList<Grade>;
}
