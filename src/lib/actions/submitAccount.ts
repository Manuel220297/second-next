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

export async function submitAccount(data: AccountFormData) {
  const { databases } = await createAdminClient();

  try {
    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, // ⬅️ Your Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STUDENTS, // ⬅️ Your collection ID
      data.userId, // Document ID (or use 'unique()' if you want Appwrite to generate it)
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
