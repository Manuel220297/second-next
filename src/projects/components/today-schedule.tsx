import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import getSubjects, { Subject } from '@/lib/actions/getSubjects';
import getSubjectLists from '@/lib/actions/getSubjectLists';
import isNowBetween from '@/lib/actions/isNowBetween';
import getStudent from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';

export default async function TodaySchedule() {
  const { user } = await getLoggedInUser();

  if (!user?.id) return <>You are not login</>;
  const { documents: student } = await getStudent(user?.id);
  console.log('🔴: ', student[0].grades);
  const subjects = await getSubjectLists();

  const schedule = subjects;

  return (
    <div className='space-y-4'>
      {schedule.map((session) => {
        const isCurrent = isNowBetween(session.scheduleStart!, session.scheduleEnd!);
        console.log('asd', isCurrent);
        return (
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
              <div className='text-muted-foreground'>{`${session.teachers.first_name} ${session.teachers.last_name}` || 'None'}</div>
              <div className='text-muted-foreground'>{session.room || 'Labas'}</div>
            </div>

            {isCurrent && <div className='mt-1 text-xs font-medium text-primary'>Current Class</div>}
          </div>
        );
      })}
    </div>
  );
}
