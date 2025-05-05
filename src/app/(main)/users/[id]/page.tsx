import { DonutChart } from '@/projects/components/DonutChart';
import Image from 'next/image';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import getGrades from '@/lib/actions/getGrades';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { documents: grades } = await getGrades(id);

  console.log('This is Grades: ', grades);
  console.log('This is Student: ', grades[0].students);
  console.log('This is Subject: ', grades[0].subjects);
  console.log('This is Prelim Score: ', grades[0].prelim);
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 min-h-[100vh] md:min-h-auto'>
        <div className=''>
          <DonutChart></DonutChart>
        </div>
        <div className='col-span-2'>
          <DataTable columns={columns} data={grades}></DataTable>
        </div>
      </div>
    </>
  );
};

export default page;
