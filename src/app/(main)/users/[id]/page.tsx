import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DonutChart } from '@/projects/components/DonutChart';
import Image from 'next/image';
import React from 'react';
import { DataTable } from './data-table';
import { Subjects, columns } from './columns';
import subjects from '@/data/subjects.json';
import users from '@/data/users.json';

const getSubjects = async (): Promise<Subjects[]> => {
  return subjects.subjects;
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  let userId = parseInt(id);
  let userData = users.find((u) => u.id === userId);
  const imageCount = 2; //
  const randomIndex = Math.floor(Math.random() * imageCount);
  const imgSrc = `/images/profile/icon${randomIndex}.webp`;

  const subjects = await getSubjects();
  console.log(subjects[0].students);
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 min-h-[100vh] md:min-h-auto'>
        <div className=''>
          <DonutChart></DonutChart>
        </div>
        <div className='col-span-2'>
          <DataTable columns={columns} data={subjects}></DataTable>
        </div>
      </div>
    </>
  );
};

export default page;
