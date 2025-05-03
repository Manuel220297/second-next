'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from '../server/appwrite';

export const getUsername = async (session: string) => {
  try {
    if (!session) {
      return 'There is no session';
    }
    const { account } = await createSessionClient(session);

    const user = await account.get();

    console.log('The user: ', user.$id);
    console.log('There is a usernamez: ', user.name);
    return user?.name;
  } catch (error) {
    console.log('No user name', error);
    return null;
  }
};

export default getUsername;
