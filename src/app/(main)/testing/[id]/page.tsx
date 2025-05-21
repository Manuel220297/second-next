import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import getStudent from '@/lib/actions/getStudent';
import getStudentLists from '@/lib/actions/getStudentLists';
import getSubjects from '@/lib/actions/getSubjects';
import { getLoggedInUser } from '@/lib/server/appwrite';
import AppAddStudent, { AddStudent } from '@/projects/components/AppAddStudent';
import { PlusCircle } from 'lucide-react';
import React from 'react';

const TestingPage = async () => {
  const { user } = await getLoggedInUser();
  const students = await getStudentLists();

  if (!user?.id) return <>You are not login</>;

  return (
    <>
      <AppAddStudent students={students as AddStudent[]} documentId={'1-networking'} />
    </>
  );
};

export default TestingPage;
