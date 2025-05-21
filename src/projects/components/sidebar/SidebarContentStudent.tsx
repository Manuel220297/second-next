'use client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Subject } from '@/lib/actions/getSubjects';
import Link from 'next/link';
import React from 'react';

const SidebarContentStudent = ({ student }: any) => {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  if (!isExpanded) {
    return <></>;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className=''>
        {student[0]?.subjects?.map((subjects: Subject, subjectsIndex: React.Key | null | undefined) => {
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

          console.log('Name ', subjects.name);

          const formattedScheduleStart = formatTime(subjects?.scheduleStart!);
          const formattedScheduleEnd = formatTime(subjects?.scheduleEnd!);
          const schedule = `${formattedScheduleStart} - ${formattedScheduleEnd}`;
          return (
            <SidebarMenuButton className='overflow-visible' key={subjectsIndex} asChild>
              <Link className='my-4' href={`/subjects/${subjects?.id}`}>
                <div className='flex flex-col'>
                  <div>{subjects?.name}</div>
                  <div className='text-primary text-xs font-light tracking-wider'>
                    {schedule} {subjects?.scheduleDay ? subjects.scheduleDay.charAt(0).toUpperCase() + subjects.scheduleDay.slice(1) : ''}
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
