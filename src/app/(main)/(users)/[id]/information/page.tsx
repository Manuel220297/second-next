import getStudent from '@/lib/actions/getStudent';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const InformationPage = async ({ params }: Props) => {
  const { id } = await params;
  const { documents: student } = await getStudent(id);

  console.log();

  return (
    <div className='flex flex-col'>
      <h1>
        Name: {student[0].first_name} {student[0].last_name}
      </h1>
      <h1>Email: {student[0].email || 'N/A'}</h1>
      <h1>Level: {student[0].gradeLevel || 'N/A'}</h1>
      <h1>Course: {student[0].course || 'N/A'}</h1>
      <h1>Location: {student[0].location || 'N/A'}</h1>
      <h1>Phone: {student[0].phone || 'N/A'}</h1>
      <h1>Payment status: {student[0].isPayed ? 'Paid' : 'Not paid'}</h1>
      <h1>Account creation date: {student[0].$createdAt || 'N/A'}</h1>
      <h1>Profile Icon: {student[0].avatar || 'N/A'}</h1>
      <h1>Profile Wallpaper: {student[0].wallpaper || 'N/A'}</h1>
    </div>
  );
};

export default InformationPage;
