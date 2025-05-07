import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Student } from './getStudent';

export interface Subject extends Models.Document {
  name: string;
  id: string;
  scheduleStart?: string;
  scheduleEnd?: string;
  scheduleDay?: string;
}
export default async function getSubjects(id: string): Promise<Models.DocumentList<Subject>> {
  const { databases } = await createAdminClient();

  const documents = await databases.listDocuments('student-project', 'subjectCollection');

  const filteredDocuments = documents.documents.filter((doc) => doc.id == id);

  console.log(documents);
  return { documents: filteredDocuments } as Models.DocumentList<Subject>;
}
