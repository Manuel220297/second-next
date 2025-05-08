'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Grade } from '@/lib/actions/getGrades';

export const columns: ColumnDef<Grade>[] = [
  {
    accessorKey: 'subjects.name',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Subjects
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const subjectName = row.original.subjects?.name ?? 'N/A';
      return <div className='whitespace-normal break-words max-w-[200px]'>{subjectName}</div>;
    },
  },
  {
    header: 'Prelim',
    cell: ({ row }) => {
      const grade = row.original;

      return grade?.prelim ?? 'N/A';
    },
  },
  {
    header: 'Midterm',
    cell: ({ row }) => {
      const grade = row.original;

      return grade?.midterm ?? 'N/A';
    },
  },

  {
    header: 'Prefinal',
    cell: ({ row }) => {
      const grade = row.original;

      return grade?.prefinal ?? 'N/A';
    },
  },

  {
    header: 'Final',
    cell: ({ row }) => {
      const grade = row.original;

      return grade?.final ?? 'N/A';
    },
  },
];
