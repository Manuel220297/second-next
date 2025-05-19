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

  // const schedule: ClassSession[] = [
  //   {
  //     id: 1,
  //     scheduleStart: '08:00 AM',
  //     scheduleEnd: '09:30 AM',
  //     subject: 'English Literature',
  //     room: 'Room 118',
  //     students: 24,
  //   },
  //   {
  //     id: 2,
  //     scheduleStart: '09:45 AM',
  //     scheduleEnd: '11:15 AM',
  //     subject: 'English Literature',
  //     room: 'Room 118',
  //     students: 22,
  //   },
  //   {
  //     id: 3,
  //     scheduleStart: '11:30 AM',
  //     scheduleEnd: '01:00 PM',
  //     subject: 'Creative Writing',
  //     room: 'Room 120',
  //     students: 18,
  //   },
  //   {
  //     id: 4,
  //     scheduleStart: '02:00 PM',
  //     scheduleEnd: '03:30 PM',
  //     subject: 'English Literature',
  //     room: 'Room 118',
  //     students: 26,
  //   },
  // ];

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
          {/* {session.isCurrent && (
            <div className='mt-1 flex items-center justify-between'>
              <div className='text-xs font-medium text-primary'>Current Class</div>
              <Badge variant='outline' className='text-xs'>
                In Progress
              </Badge>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
