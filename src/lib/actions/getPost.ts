// import { ID, Query, Models } from 'node-appwrite';
// import { createAdminClient } from '../server/appwrite';
// import { Grade } from './getGrades';
// import { Material } from './createPost';

// export default async function getMaterial(userId: string): Promise<Models.DocumentList<Material>> {
//   const { databases } = await createAdminClient();

//   const { documents } = await databases.listDocuments();

//   const filteredDocuments = documents.filter((doc) => doc.userId === userId);

//   // console.log('This are the documents', documents);
//   return { documents: filteredDocuments } as Models.DocumentList<Material>;
// }
