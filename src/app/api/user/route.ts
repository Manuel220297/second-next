// src/app/page.jsx
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

export default async function Testlogin() {
  const { isAuthenticated } = await getLoggedInUser();

  console.log(isAuthenticated);
  if (!isAuthenticated) redirect('/login');
  redirect('/dashboard');
}
