import type { Metadata } from 'next';
import localFont from 'next/font/local';
import UserHeader from './UserHeader';
import users from '@/data/users.json';
import { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = users.find((u) => u.id === parseInt(id));
  return {
    title: user ? `${user.name}` : 'User Page',
  };
}
export default async function UserLayout({ children, params }: { children: ReactNode; params: { id: string } }) {
  const { id } = await params;

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return <div>User not found.</div>;
  return (
    <div className={`antialiased flex`}>
      <main className='grid grid-rows-2 h-[130vh] py-4 w-full'>
        <UserHeader user={user} />
        {children}
      </main>
    </div>
  );
}
