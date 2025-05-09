import getStudent from '@/lib/actions/getStudent';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import ConfirmTeacherAccountPage from '@/projects/components/ConfirmTeacherAccountPage';

import React from 'react';

const TeacherAccountPage = async () => {
  const { user } = await getLoggedInUser();

  const { documents: teacher } = await getTeacher(user!.id);

  return (
    <div className='px-4'>
      <p className='my-4'>Your user id: {user?.id}</p>
      <ConfirmTeacherAccountPage defaultValues={teacher[0]} userId={user!.id} email={user!.email}></ConfirmTeacherAccountPage>
    </div>
  );
};

export default TeacherAccountPage;
