import getLearningMaterialsLists from '@/lib/actions/getLearningMaterialsLists';
import getStudent from '@/lib/actions/getStudent';
import getSubjects from '@/lib/actions/getSubjects';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react';
import LearnMaterialsClient from './LearnMaterialsClient';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const LearnPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { documents: subject } = await getSubjects(id);
  const { user } = await getLoggedInUser();

  if (user) {
    const { documents: student } = await getStudent(user.id);
    const { documents: teacher } = await getTeacher(user.id);

    // console.log(student[0].first_name, '✖💖', student.length > 0 && !!student[0].assessments && student[0].assessments.totalBalance < 0);

    if (!teacher && student[0].assessments!.totalBalance! < 0) {
      return (
        <div className='flex justify-center items-center min-h-screen'>
          <Alert variant='destructive' className='max-w-md'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>Your account is unpaid. Outstanding balance: ₱{student[0].assessments?.totalBalance}</AlertDescription>
          </Alert>
        </div>
      );
    }
  }

  const labels = user?.label || [];
  const isSuperUser = labels.includes('superuser');
  // const isMatch = subject[0].teachers.some((teacher: any) => (Array.isArray(teacher.userId) ? teacher.userId.includes(user?.id) : teacher.userId === user?.id));
  const isMatch = subject[0].teachers.userId == user?.id;

  return <LearnMaterialsClient userId={user!.id} subjectId={id} canPost={isMatch || isSuperUser} />;
};

export default LearnPage;
