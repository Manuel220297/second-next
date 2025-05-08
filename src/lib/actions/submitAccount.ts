'use server';

import { createAdminClient } from '../server/appwrite';

export interface AccountFormData {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  phone: string;
}

function generateCustomId(firstName: string, lastName: string) {
  const part1 = firstName.substring(0, 5).toLowerCase();
  const part2 = lastName.substring(0, 3).toLowerCase();
  const unique = Math.random().toString(36).substring(2, 7);
  return `${part1}-${part2}-${unique}`;
}

export async function submitAccount(data: AccountFormData) {
  const { databases } = await createAdminClient();

  try {
    const documentId = generateCustomId(data.first_name, data.last_name);

    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STUDENTS, //  Collection ID
      documentId, // Document ID (or use 'unique()' if you want Appwrite to generate it)
      {
        userId: data.userId,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        location: data.location,
        phone: data.phone,
      }
    );

    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document creation failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
