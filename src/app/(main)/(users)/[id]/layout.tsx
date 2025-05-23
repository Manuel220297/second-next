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
import getTeacher from '@/lib/actions/getTeacher';

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

  const { documents: student } = await getStudent(id);

  let userType: 'student' | 'teacher' | 'unknown' = 'unknown';

  if (student.length > 0) {
    console.log('👏👏', student[0].assessments?.totalBalance);
    if (id == user?.id && !student[0]) {
      return (
        <div>
          You account is still incomplete,
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
  } else {
    const { documents: teacher } = await getTeacher(user!.id);

    userType = 'teacher';
    if (userType == 'teacher') {
      if (!teacher[0]) {
        return (
          <div>
            <NotFoundPage></NotFoundPage>
          </div>
        );
      }
      return <div>You are a teacher, There's still no profile for teacher</div>;
    }
  }
}
