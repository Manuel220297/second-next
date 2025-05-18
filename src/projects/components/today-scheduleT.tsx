import { Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ClassSession {
  id: number;
  time: string;
  endTime: string;
  subject: string;
  grade: string;
  room: string;
  students: number;
  isCurrent: boolean;
}

export default function TodayScheduleT() {
  // Mock data for today's teaching schedule
  const schedule: ClassSession[] = [
    {
      id: 1,
      time: '08:00 AM',
      endTime: '09:30 AM',
      subject: 'English Literature',
      grade: '10th Grade',
      room: 'Room 118',
      students: 24,
      isCurrent: false,
    },
    {
      id: 2,
      time: '09:45 AM',
      endTime: '11:15 AM',
      subject: 'English Literature',
      grade: '11th Grade',
      room: 'Room 118',
      students: 22,
      isCurrent: true,
    },
    {
      id: 3,
      time: '11:30 AM',
      endTime: '01:00 PM',
      subject: 'Creative Writing',
      grade: '12th Grade',
      room: 'Room 120',
      students: 18,
      isCurrent: false,
    },
    {
      id: 4,
      time: '02:00 PM',
      endTime: '03:30 PM',
      subject: 'English Literature',
      grade: '9th Grade',
      room: 'Room 118',
      students: 26,
      isCurrent: false,
    },
  ];

  return (
    <div className='space-y-4'>
      {schedule.map((session) => (
        <div key={session.id} className={cn('flex flex-col gap-1 rounded-lg border p-3 text-sm', session.isCurrent && 'border-primary bg-primary/5')}>
          <div className='flex items-center justify-between'>
            <div className='font-medium'>{session.subject}</div>
            <div className='flex items-center text-muted-foreground'>
              <Clock className='mr-1 h-3 w-3' />
              <span>
                {session.time} - {session.endTime}
              </span>
            </div>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center gap-2'>
              <span className='text-muted-foreground'>{session.grade}</span>
              <span className='text-muted-foreground'>{session.room}</span>
            </div>
            <div className='flex items-center text-muted-foreground'>
              <Users className='mr-1 h-3 w-3' />
              <span>{session.students} students</span>
            </div>
          </div>
          {session.isCurrent && (
            <div className='mt-1 flex items-center justify-between'>
              <div className='text-xs font-medium text-primary'>Current Class</div>
              <Badge variant='outline' className='text-xs'>
                In Progress
              </Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
