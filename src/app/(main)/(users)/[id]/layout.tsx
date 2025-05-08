import type { Metadata } from 'next';
import localFont from 'next/font/local';
import UserHeader from './UserHeader';
import users from '@/data/users.json';
import { ReactNode } from 'react';
import getGrades from '@/lib/actions/getGrades';
import { getLoggedInUser } from '@/lib/server/appwrite';
import getStudent from '@/lib/actions/getStudent';
import { formatCourse, formatEducationLevel } from '@/lib/utils';
import NotFoundPage from '@/app/not-found';
import LayoutTransition from '@/projects/components/LayoutTransition';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { documents: student } = await getStudent(id);
  return {
    title: student[0] ? student[0].first_name : 'User Page',
  };
}
export default async function UserLayout({ children, params }: { children: ReactNode; params: { id: string } }) {
  const { id } = await params;
  const { user } = await getLoggedInUser();

  // console.log('User ID:', user?.id);
  // console.log('Web Id', id);
  const { documents: student } = await getStudent(id);

  if (id == user?.id && !student[0]) {
    return (
      <div>
        You account is still incomplete,{' '}
        <Link href={'/account'}>
          <Button variant='link'>Click here to complete your account</Button>
        </Link>
      </div>
    );
  }

  if (!student[0]) {
    return (
      <div>
        <NotFoundPage></NotFoundPage>
      </div>
    );
  }
  return (
    <LayoutTransition>
      <div className={`antialiased flex`}>
        <main className='grid grid-rows-2 h-[130vh] py-4 w-full'>
          <UserHeader
            first_name={student[0].first_name}
            last_name={student[0].last_name}
            course={formatCourse(student[0].course!)}
            gradeLevel={formatEducationLevel(student[0].gradeLevel!)}
            avatar={student[0].avatar}
            wallpaper={student[0].wallpaper}
            id={student[0].userId}
          />
          {children}
        </main>
      </div>
    </LayoutTransition>
  );
}
