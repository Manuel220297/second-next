import { Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getLoggedInUser } from '@/lib/server/appwrite';
import getTeacher from '@/lib/actions/getTeacher';

interface ClassSession {
  id: number;
  scheduleStart: string;
  scheduleEnd: string;
  subject: string;
  room: string;
  students: number;
}

export default async function TodayScheduleT() {
  const { user } = await getLoggedInUser();

  if (!user?.id) return <>You are not login</>;
  const { documents: teacher } = await getTeacher(user?.id);

  const schedule = teacher[0].subjects;

  return (
    <div className='space-y-4'>
      {schedule?.map((session) => (
        <div key={session.id} className='flex flex-col gap-1 rounded-lg border p-3 text-sm'>
          <div className='flex items-center justify-between'>
            <div className='font-medium'>{session.name}</div>
            <div className='flex items-center text-muted-foreground'>
              <Clock className='mr-1 h-3 w-3' />
              <span>
                {session.scheduleStart} - {session.scheduleEnd}
              </span>
            </div>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center gap-2'>
              <span className='text-muted-foreground'>Room {session.room || 'N/A'}</span>
            </div>
            <div className='flex items-center text-muted-foreground'>
              <Users className='mr-1 h-3 w-3' />
              <span>{session.students.length} students</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
