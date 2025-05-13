import getLearningMaterialsLists from '@/lib/actions/getLearningMaterialsLists';
import getStudent from '@/lib/actions/getStudent';
import getSubjects from '@/lib/actions/getSubjects';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react';
import CreatePost from '../CreatePost';
import MaterialsList from './MaterialList';

const LearnPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { documents: subject } = await getSubjects(id);
  const { user } = await getLoggedInUser();

  const materials = await getLearningMaterialsLists();

  const filteredMaterials = materials.filter((material) => material.subjects?.id === id);

  // console.log('These are materials', materials);
  if (user) {
    const { documents: student } = await getStudent(user.id);

    const { documents: teacher } = await getTeacher(user.id);

    if (student.length > 0) {
      if (!student[0].isPayed) {
        return 'You are not paid, you are not allowed to be here';
      }
    }
  }

  //admin later
  console.log(
    '🚀 ~ LearnPage ~ subject[0].teachers.map((teacher: any) => teacher.userId):',
    subject[0].teachers.map((teacher: any) => teacher.userId),
    'userId: ',
    user?.id
  );

  const labels = user?.label || [];
  const isSuperUser = labels.includes('superuser');
  const isMatch = subject[0].teachers.some((teacher: any) => (Array.isArray(teacher.userId) ? teacher.userId.includes(user?.id) : teacher.userId === user?.id));

  console.log('Match:', isMatch);

  return (
    <>
      Learning Modules {subject[0].name} {materials[0].authorId}
      {/* <Button></Button> */}
      <div className='container mx-auto py-10'>
        <h1 className='text-3xl font-bold mb-6'>Materials</h1>
        <MaterialsList materials={filteredMaterials} />
      </div>
      {(isMatch || isSuperUser) && <CreatePost authorId={user!.id} subjectId={id} />}
    </>
  );
};

export default LearnPage;
