import { Bell } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function WelcomeBanner() {
  const studentName = 'Alex Johnson';
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
          <h1 className='text-2xl font-bold tracking-tight'>Welcome back, {studentName}!</h1>
          <p className='text-muted-foreground'>{currentDate}</p>
        </div>
      </div>

      <Alert className='bg-primary/10 border-primary/20'>
        <AlertTitle className='text-primary'>Important Announcement</AlertTitle>
        <AlertDescription>Spring break has been extended by one week. Classes will resume on April 15th instead of April 8th.</AlertDescription>
      </Alert>
    </div>
  );
}
