import getLearningMaterialsLists from '@/lib/actions/getLearningMaterialsLists';
import getStudent from '@/lib/actions/getStudent';
import getSubjects from '@/lib/actions/getSubjects';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react';
import LearnMaterialsClient from './LearnMaterialsClient';

const LearnPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { documents: subject } = await getSubjects(id);
  const { user } = await getLoggedInUser();

  if (user) {
    const { documents: student } = await getStudent(user.id);
    const { documents: teacher } = await getTeacher(user.id);

    if (student.length > 0 && !student[0].isPayed) {
      return 'You are not paid, you are not allowed to be here';
    }
  }

  const labels = user?.label || [];
  const isSuperUser = labels.includes('superuser');
  const isMatch = subject[0].teachers.some((teacher: any) => (Array.isArray(teacher.userId) ? teacher.userId.includes(user?.id) : teacher.userId === user?.id));

  return <LearnMaterialsClient userId={user!.id} subjectId={id} canPost={isMatch || isSuperUser} />;
};

export default LearnPage;
