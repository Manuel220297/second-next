'use client';

import { Button } from '@/components/ui/button';
import { createGrades, CreateGradesData } from '@/lib/actions/createGrades';
import React from 'react';

const JoinSubjectButton = ({ data, subjectName }: any) => {
  const handleJoin = async () => {
    try {
      const result = await createGrades(data);
      console.log('Creation result:', result);
    } catch (error) {
      console.error('Creation failed:', error);
    }
  };
  return <Button onClick={handleJoin}>Join {subjectName} </Button>;
};

export default JoinSubjectButton;
