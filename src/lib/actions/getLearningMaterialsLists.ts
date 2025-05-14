import { createAdminClient } from '../server/appwrite';
import { Models } from 'node-appwrite';

export interface LearningMaterials extends Models.Document {
  authorId: string;
  material_id: string;
  title: string;
  content: string;
}

export default async function getLearningMaterialsLists(): Promise<LearningMaterials[]> {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MATERIALS);

  return documents as LearningMaterials[];
}
