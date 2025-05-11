import getLearningMaterialsLists from '@/lib/actions/getLearningMaterialsLists';
import getStudent from '@/lib/actions/getStudent';
import getSubjects from '@/lib/actions/getSubjects';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react';

const LearnPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { documents: subject } = await getSubjects(id);
  const { user } = await getLoggedInUser();

  const materials = await getLearningMaterialsLists();

  console.log('These are materials', materials);
  if (user) {
    const { documents: student } = await getStudent(user.id);

    if (!student[0].isPayed) {
      return 'You are not paid, you are not allowed to be here';
    }
  }

  return (
    <>
      Learning Modules {subject[0].name} {materials[0].authorId}
      <div className='border'>
        {materials.map((material) => (
          <div key={material.$id}>
            {material.title}
            {material.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default LearnPage;
