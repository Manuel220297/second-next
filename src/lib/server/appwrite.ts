'use server';
import { Client, Account, Users, Databases } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function createSessionClient(session: string) {
  const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  // const session = (await cookies()).get('myproject-session');
  if (!session) {
    throw new Error('No session');
  }

  client.setSession(session);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client().setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT).setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const session = (await cookies()).get('myproject-session');
    if (!session) {
      return {
        isAuthenticated: false,
      };
    }

    const { account } = await createSessionClient(session?.value);
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
        label: user.labels,
      },
    };
  } catch (error) {
    return {
      isAuthenticated: false,
    };
  }
}

// export async function createGradesDocument(documentId: string) {
//   const { databases } = await createAdminClient();

//   const { documents } = await databases.createDocument('student-project', 'gradeCollection', documentId);
// }
