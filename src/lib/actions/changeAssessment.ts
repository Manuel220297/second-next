'use server';

import { createAdminClient } from '../server/appwrite';

interface ChangeAssessment {
  documentId: string;
  totalPayments: number;
  totalBalance: number;
  totalRefunds: number;
}

export async function changeAssessment(data: ChangeAssessment) {
  const { databases } = await createAdminClient();

  try {
    const result = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ASSESSMENTS, //  Collection ID
      data.documentId,
      {
        totalPayments: data.totalPayments,
        totalBalance: data.totalBalance,
        totalRefunds: data.totalRefunds,
      }
    );

    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document update failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
