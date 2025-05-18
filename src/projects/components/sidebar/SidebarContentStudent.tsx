'use client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Grade } from '@/lib/actions/getGrades';
import Link from 'next/link';
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import StudentGradeLinks from './StudentGradeLinks';

const SidebarContentStudent = ({ student }: any) => {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  if (!isExpanded) {
    return <></>;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <StudentGradeLinks grades={student[0]?.grades || []} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarContentStudent;
