import getStudent from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { ConfirmStudentAccountPage } from '@/projects/components/ConfirmStudentAccountPage';
import React from 'react';

const AccountPage = async () => {
  const { user } = await getLoggedInUser();

  const { documents: student } = await getStudent(user!.id);

  return (
    <div className='px-4'>
      <p className='my-4'>Your user id: {user?.id}</p>
      <ConfirmStudentAccountPage defaultValues={student[0]} userId={user!.id} email={user!.email}></ConfirmStudentAccountPage>
    </div>
  );
};

export default AccountPage;
