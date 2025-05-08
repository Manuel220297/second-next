import { DonutChart } from '@/projects/components/DonutChart';
import Image from 'next/image';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import getGrades from '@/lib/actions/getGrades';
import getStudent from '@/lib/actions/getStudent';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { documents: grades } = await getGrades(id);
  const { documents: students } = await getStudent(id);

  console.log('This is Student: ', students[0]);
  return (
    <>
      {/* <div className='flex flex-col min-h-[100vh] md:min-h-auto'>
        <DonutChart></DonutChart>
      </div> */}
      <div className='w-full px-2 sm:px-4 md:px-8 max-w-full mx-auto'>
        <DataTable columns={columns} data={grades} />
      </div>
    </>
  );
};

export default page;
