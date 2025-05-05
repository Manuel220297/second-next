import type { Metadata } from 'next';
import localFont from 'next/font/local';
import UserHeader from './UserHeader';
import users from '@/data/users.json';
import { ReactNode } from 'react';
import getGrades from '@/lib/actions/getGrades';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { documents: grades } = await getGrades(id);
  return {
    title: grades[0] ? grades[0].students?.first_name : 'User Page',
  };
}
export default async function UserLayout({ children, params }: { children: ReactNode; params: { id: string } }) {
  const { id } = await params;

  const { documents: grades } = await getGrades(id);

  if (!grades[0]) return <div>User not found.</div>;
  return (
    <div className={`antialiased flex`}>
      <main className='grid grid-rows-2 h-[130vh] py-4 w-full'>
        <UserHeader first_name={grades[0].students?.first_name} />
        {children}
      </main>
    </div>
  );
}
