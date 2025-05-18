'use client';

import { Grade } from '@/lib/actions/getGrades';
import Link from 'next/link';
import { SidebarMenuButton } from '@/components/ui/sidebar';

type Props = {
  grades: Grade[];
};

const StudentGradeLinks = ({ grades }: Props) => {
  function formatTime(timeString: string | null): string {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  return (
    <>
      {grades.map((grade: Grade, index) => {
        const formattedScheduleStart = formatTime(grade.subjects?.scheduleStart!);
        const formattedScheduleEnd = formatTime(grade.subjects?.scheduleEnd!);
        const schedule = `${formattedScheduleStart} - ${formattedScheduleEnd}`;
        const scheduleDay = grade.subjects?.scheduleDay ? grade.subjects.scheduleDay.charAt(0).toUpperCase() + grade.subjects.scheduleDay.slice(1) : '';

        return (
          <SidebarMenuButton className='overflow-visible' key={index} asChild>
            <Link className='my-4' href={`/subjects/${grade.subjects?.id}`}>
              <div className='flex flex-col'>
                <div>{grade.subjects?.name}</div>
                <div className='text-primary/65 text-xs'>
                  {schedule} {scheduleDay}
                </div>
              </div>
            </Link>
          </SidebarMenuButton>
        );
      })}
    </>
  );
};

export default StudentGradeLinks;
