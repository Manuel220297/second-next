import getStudent from '@/lib/actions/getStudent';
import getStudentOrTeacher from '@/lib/actions/getStudentOrTeacher';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
// import { ConfirmStudentAccountPage } from '@/projects/components/ConfirmStudentAccountPage';
import React from 'react';

const UpdateAccountPage = async () => {
  const { user } = await getLoggedInUser();

  const { documents: student } = await getStudent(user!.id);

  let userType: 'student' | 'teacher' | 'unknown' = 'unknown';
  let defaultValues;

  if (student.length > 0) {
    userType = 'student';
    defaultValues = student[0];
  } else {
    const { documents: teacher } = await getTeacher(user!.id);

    userType = 'teacher';
    defaultValues = teacher[0];
  }
  console.log(userType); // 'student', 'teacher', or 'unknown'

  return (
    <div className='px-4'>
      <p className='my-4'>Your user id: {user?.id}</p>

      {/* <ConfirmStudentAccountPage defaultValues={defaultValues} userId={user!.id} email={user!.email} /> */}
    </div>
  );
};

export default UpdateAccountPage;
