import { createAdminClient } from '../server/appwrite';

export default async function getGrades() {
  const { databases } = await createAdminClient();

  const { documents } = await databases.listDocuments('student-project', '68178090002f92839a9c');

  console.log(documents);
}
