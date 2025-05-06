import { getLoggedInUser } from '@/lib/server/appwrite';
import AdminHome from '@/projects/components/AdminHome';
import { DefaultHome } from '@/projects/components/DefaultHome';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { user } = await getLoggedInUser();
  const containsSuper = user?.label.includes('superuser');
  console.log(user?.label[0]);
  console.log(containsSuper);

  if (containsSuper) {
    return (
      <>
        <AdminHome></AdminHome>
      </>
    );
  }

  return (
    <>
      <DefaultHome></DefaultHome>
    </>
  );
}
