import NotFoundPage from '@/app/not-found';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import CreateSubject from '@/projects/components/CreateSubject';
import React from 'react';

const CreateSubjectPage = async () => {
  const { user } = await getLoggedInUser();
  const { documents: teacher } = await getTeacher(user?.id!);
  if (!teacher) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <CreateSubject documentId={teacher[0].$id}></CreateSubject>
    </div>
  );
};

export default CreateSubjectPage;
