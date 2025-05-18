import getStudent from '@/lib/actions/getStudent';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { ConfirmAccountPage } from '@/projects/components/ConfirmAccountPage';
import { redirect } from 'next/navigation';
import React from 'react';

const AccountPage = async () => {
  const { user } = await getLoggedInUser();

  if (!user?.id) {
    return <>{redirect('/signup')}</>;
  }

  const { documents: student } = await getStudent(user!.id);
  const { documents: teacher } = await getTeacher(user!.id);

  if (student.length > 0 || teacher.length > 0) {
    return redirect('/');
  }

  return (
    <div className='px-4'>
      <p className='my-4'>Your user id: {user?.id}</p>
      <ConfirmAccountPage defaultValues={student[0]} userId={user!.id} email={user!.email}></ConfirmAccountPage>
    </div>
  );
};

export default AccountPage;
