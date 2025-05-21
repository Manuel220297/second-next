'use server';

import { createAdminClient } from '../server/appwrite';
import { changeAssessment } from './changeAssessment';
import { Student } from './getStudent';
import { Subject } from './getSubjects';

export interface Transactions {
  date: string;
  reference: string;
  method: string;
  amount: number;
  type: string;
  students: string;
}

function generateCustomId() {
  const unique = Math.random().toString(36).substring(2, 9);
  return `${unique}`;
}

export async function createTransaction(data: Transactions) {
  const { databases } = await createAdminClient();

  try {
    const documentId = generateCustomId();

    const result = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_TRANSACTIONS, //  Collection ID
      documentId,
      {
        students: data.students,
        date: data.date,
        reference: data.reference,
        method: data.method,
        amount: data.amount,
        type: data.type,
      }
    );
    console.log('💦', data.students);
    const assessment = await databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ASSESSMENTS, data.students);

    let totalPayments = assessment.totalPayments || 0;
    let totalRefunds = assessment.totalRefunds || 0;
    let totalBalance = assessment.totalBalance || 0;

    if (data.type == 'payment') {
      totalPayments += data.amount;
      totalBalance -= data.amount;
    } else if (data.type == 'refund') {
      totalRefunds += data.amount;
    } else {
      totalPayments += data.amount;
    }

    // const totalBalance = (assessment.totalAmount || 0) - totalPayments + totalRefunds;

    // Update the assessment
    await changeAssessment({
      documentId: data.students,
      totalPayments,
      totalRefunds,
      totalBalance,
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('[Appwrite] Document creation failed:', error);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
}
