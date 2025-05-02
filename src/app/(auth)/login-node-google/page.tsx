import { getLoggedInUser } from '@/lib/server/appwrite';
import { signUpWithGoogle } from '@/lib/server/oauth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const user = await getLoggedInUser();

  if (user) redirect('/dashboard');

  return (
    <>
      <button onClick={signUpWithGoogle} type='submit'>
        Sign up with Gogleb
      </button>
    </>
  );
}
