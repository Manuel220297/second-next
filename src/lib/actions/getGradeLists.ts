import { ID, Query, Models } from 'node-appwrite';
import { createAdminClient } from '../server/appwrite';
import { Subject } from './getSubjects';

export default async function getGradesLists(): Promise<Subject[]> {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GRADES);

  return documents as Subject[];
}
