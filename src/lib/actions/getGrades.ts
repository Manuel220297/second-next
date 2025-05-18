import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Student } from './getStudent';
import { Subject } from './getSubjects';

export interface Grade extends Models.Document {
  prelim?: number;
  midterm?: number;
  prefinal?: number;
  final?: number;
  students?: Student;
  subjects: Subject;
}
export default async function getGrades(userId: string): Promise<Models.DocumentList<Grade>> {
  const { databases } = await createAdminClient();

  const documents = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GRADES);

  const filteredDocuments = documents.documents.filter((doc) => doc.students?.userId === userId);

  return { documents: filteredDocuments } as Models.DocumentList<Grade>;
}
