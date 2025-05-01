// 'use server';

// import { createSessionClient } from '@/lib/server/appwrite';
// import { cookies } from 'next/headers';

// async function destroySession() {
//   //Retrieve session cookie
//   const sessionCookie = (await cookies()).get('myproject-session');

//   if (!sessionCookie) {
//     return {
//       error: 'No session cookie found',
//     };
//   }

//   try {
//     const { account } = await createSessionClient();

//     await account.deleteSessions();

//     // clear cookies session
//     (await cookies()).delete('myproject-session');

//     return {
//       success: true,
//     };
//   } catch (error) {
//     console.log('Authentication Error: ', error);
//     return {
//       error: 'Error deleting session',
//     };
//   }
// }

// export default destroySession;
