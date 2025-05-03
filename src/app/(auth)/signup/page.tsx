// src/app/signup/page.jsx
import { ID } from 'node-appwrite';
import { createAdminClient } from '@/lib/server/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { signUpWithGoogle } from '@/lib/server/oauth';

async function signUpWithEmail(formData: FormData) {
  'use server';

  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  const { account } = await createAdminClient();

  await account.create(ID.unique(), email as string, password as string, name as string);
  const session = await account.createEmailPasswordSession(email as string, password as string);

  (await cookies()).set('myproject-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  redirect('/dashboard');
}

export default async function SignUpPage() {
  const { isAuthenticated } = await getLoggedInUser();
  if (isAuthenticated) redirect('/');

  return (
    <>
      <form action={signUpWithEmail}>
        <input id='email' name='email' placeholder='Email' type='email' />
        <input id='password' name='password' placeholder='Password' minLength={8} type='password' />
        <input id='name' name='name' placeholder='Name' type='text' />
        <button type='submit'>Sign up</button>
      </form>
      <a href='/api/oauth'>
        <button type='button'>Sign up with Google</button>
      </a>
    </>
  );
}
