'use server';

import { createSessionClient } from '../server/appwrite';

export const getUsername = async (session: string) => {
  try {
    if (!session) {
      return 'There is no session';
    }
    const { account } = await createSessionClient(session);

    const user = await account.get();

    return user?.name;
  } catch (error) {
    console.log('No user name', error);
    return null;
  }
};

export default getUsername;
