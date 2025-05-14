'use client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Grade } from '@/lib/actions/getGrades';
import Link from 'next/link';
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';

const SidebarContentStudent = ({ student }: any) => {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  if (!isExpanded) {
    return <></>;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className=''>
        {student[0]?.grades?.map((grade: Grade, gradesIndex: React.Key | null | undefined) => {
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

          const formattedScheduleStart = formatTime(grade.subjects?.scheduleStart!);
          const formattedScheduleEnd = formatTime(grade.subjects?.scheduleEnd!);
          const schedule = `${formattedScheduleStart} - ${formattedScheduleEnd}`;
          return (
            <SidebarMenuButton className='overflow-visible' key={gradesIndex} asChild>
              <Link className='my-4' href={`/subjects/${grade.subjects?.id}`}>
                <div className='flex flex-col'>
                  <div>{grade.subjects?.name}</div>
                  <div className='text-primary/65 text-xs'>
                    {schedule} {grade.subjects?.scheduleDay ? grade.subjects.scheduleDay.charAt(0).toUpperCase() + grade.subjects.scheduleDay.slice(1) : ''}
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarContentStudent;
