import { createGrades } from '@/lib/actions/createGrades';
import getStudent from '@/lib/actions/getStudent';
import getSubjectLists from '@/lib/actions/getSubjectLists';
import { getLoggedInUser } from '@/lib/server/appwrite';
import Link from 'next/link';
import React from 'react';
import { CreateGradesData } from '@/lib/actions/createGrades';
import { Button } from '@/components/ui/button';
import JoinSubjectButton from './JoinSubjectButton';

type Props = {};

const JoinPage = async ({}: Props) => {
  const subjects = await getSubjectLists();
  const { user } = await getLoggedInUser();
  const { documents: students } = await getStudent(user?.id!);
  const data = {
    students: students[0].$id,
    subjects: subjects[0].$id,
  };

  return (
    <>
      <ul>
        {subjects.map((subject) => {
          const data = {
            students: students[0].$id,
            subjects: subject.$id,
          };
          return (
            <li key={subject.id}>
              {subject.name} {subject.$id}
              {students[0].$id}
              <JoinSubjectButton data={data} subjectName={subject.name}></JoinSubjectButton>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default JoinPage;
