import React from 'react';

const SubjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <div>SubjectPage: {id} </div>;
};

export default SubjectPage;
