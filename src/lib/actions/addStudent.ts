// 'use server';

// import { createAdminClient } from '../server/appwrite';

// export interface SubjectFormData {
//   name: string;
//   id: string;
//   scheduleStart: string;
//   scheduleEnd: string;
//   scheduleDay: string;
//   teachers: string;
//   room: string;
// }

// function generateCustomId(name: string) {
//   const part1 = name.substring(0, 10).toLowerCase().replace(/\s+/g, '');
//   const unique = Math.random().toString(36).substring(2, 7);
//   return `${part1}-${unique}`;
// }

// export async function addStudent(data: SubjectFormData) {
//   const { databases } = await createAdminClient();

//   try {
//     const documentId = generateCustomId(data.name);

//     const result = await databases.createDocument(
//       process.env.NEXT_PUBLIC_APPWRITE_DATABASE, //  Appwrite DB ID
//       process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SUBJECTS, //  Collection ID
//       documentId,
//       {
//         name: data.name,
//         id: documentId,
//         scheduleStart: data.scheduleStart,
//         scheduleEnd: data.scheduleEnd,
//         scheduleDay: data.scheduleDay,
//         teachers: data.teachers,
//         room: data.room,
//       }
//     );

//     return { success: true, result };
//   } catch (error: any) {
//     console.error('[Appwrite] Document creation failed:', error);
//     return { success: false, error: error.message ?? 'Unknown error' };
//   }
// }
