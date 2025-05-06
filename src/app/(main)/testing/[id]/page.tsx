import getStudent from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react';

const page = async () => {
  const { user } = await getLoggedInUser();

  if (!user?.id) return <>You are not login</>;
  const { documents: student } = await getStudent(user?.id);

  console.log(
    'Studenttt map',
    student[0].grades.map((grade: any) => grade.subjects.name)
  );

  return (
    <div>
      {student[0].grades.map((grades: any, gradesIndex: React.Key | null | undefined) => {
        <p key={gradesIndex}> {grades} </p>;
      })}
    </div>
  );
};

export default page;
