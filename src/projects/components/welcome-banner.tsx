import { Bell } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getLoggedInUser } from '@/lib/server/appwrite';
import getStudent from '@/lib/actions/getStudent';
import getTeacher from '@/lib/actions/getTeacher';

export default async function WelcomeBanner() {
  const { user } = await getLoggedInUser();

  const { documents: student } = await getStudent(user?.id!);
  const { documents: teacher } = await getTeacher(user?.id!);

  let userName = '';

  if (student[0]) {
    userName = `${student[0].first_name} ${student[0].last_name}`;
  } else if (teacher[0]) {
    userName = `${teacher[0].first_name} ${teacher[0].last_name}`;
  } else {
    userName = 'Unknown User';
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='space-y-4'>
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Welcome back, {userName}!</h1>
          <p className='text-muted-foreground'>{currentDate}</p>
        </div>
      </div>

      <Alert className='bg-primary/10 border-primary/20'>
        <AlertTitle className='text-primary'>No Announcement</AlertTitle>
        <AlertDescription></AlertDescription>
      </Alert>
    </div>
  );
}
