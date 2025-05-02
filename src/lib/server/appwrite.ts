'use server';
import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function createSessionClient() {
  const client = new Client().setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('student-project');

  const session = (await cookies()).get('myproject-session');
  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('student-project')
    .setKey(
      'standard_be2ff0aded485a7c66e93ffc7291d4182e792a6f8ee0d228e6590bc273c32c37bcc0022bdf0b1b969118ddc91296b40cbf89bcb00fbab05d080ca9a0fa091a3967c3f4296003ec02e1aaa52aa3882aec7b656e738f21a39690d446245c4da5fe78171a7649577927460300d6d1462250deecf8f2c6a146bcb6626fb6a6e36726'
    );

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
