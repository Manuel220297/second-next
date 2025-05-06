import { getLoggedInUser } from '@/lib/server/appwrite';
import { AppAccountPage } from '@/projects/components/AppAccountPage';
import React from 'react';

const AccountPage = async () => {
  const { user } = await getLoggedInUser();

  return (
    <div className='px-4'>
      <p className='my-4'>Your user id: {user?.id}</p>
      <AppAccountPage></AppAccountPage>
    </div>
  );
};

export default AccountPage;
