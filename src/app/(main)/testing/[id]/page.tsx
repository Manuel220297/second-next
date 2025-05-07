import getStudent from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react';

const TestingPage = async () => {
  const { user } = await getLoggedInUser();

  if (!user?.id) return <>You are not login</>;
  const { documents: student } = await getStudent(user?.id);

  console.log('Studenttt schedules from grades', student[0].grades?.[2].subjects?.scheduleDay); // not working
  console.log('Studenttt schedule', student[0].subjects[0].schedule); //working

  return (
    <div>
      <ul>
        {student[0].grades?.map((grade: any, gradesIndex: React.Key | null | undefined) => {
          return <li key={gradesIndex}> {grade.subjects.name} </li>;
        })}
      </ul>
    </div>
  );
};

export default TestingPage;
