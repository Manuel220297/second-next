import getStudent from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { ConfirmAccountPage } from '@/projects/components/ConfirmAccountPage';
import React from 'react';

const AccountPage = async () => {
  const { user } = await getLoggedInUser();

  const { documents: student } = await getStudent(user!.id);

  return (
    <div className='px-4'>
      <p className='my-4'>Your user id: {user?.id}</p>
      <ConfirmAccountPage defaultValues={student[0]} userId={user!.id} email={user!.email}></ConfirmAccountPage>
    </div>
  );
};

export default AccountPage;
