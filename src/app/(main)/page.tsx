import getStudent from '@/lib/actions/getStudent';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import AdminHome from '@/projects/components/AdminHome';
import AppStudentPage from '@/projects/components/AppStudentPage';
import AppTeacherPage from '@/projects/components/AppTeacherPage';
import { DefaultHome } from '@/projects/components/DefaultHome';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { user } = await getLoggedInUser();

  const { documents: student } = await getStudent(user?.id!);
  const { documents: teacher } = await getTeacher(user?.id!);

  const containsSuper = user?.label.includes('superuser');

  if (student.length > 0) {
    return (
      <>
        <AppStudentPage></AppStudentPage>
      </>
    );
  }

  if (teacher.length > 0) {
    return (
      <div>
        <AppTeacherPage></AppTeacherPage>
      </div>
    );
  }
}
