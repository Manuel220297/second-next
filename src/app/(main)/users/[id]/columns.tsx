'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Subjects = {
  name: string;
  students: {
    id: string;
    firstName: string;
    surname: string;
    grades: {
      prelim: number;
      midterm: number;
      prefinal: number;
      final: number;
    };
    avatar: string;
  }[];
  posts: {
    id: string;
    title: string;
    content: string;
    timestamp: string;
    images?: {
      url: string;
      alt: string;
    }[];
    attachments: {
      filename: string;
      url: string;
      type: string;
    }[];
  }[];
};

export const columns: ColumnDef<Subjects>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Subjects
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    header: 'Prelim',
    cell: ({ row }) => {
      const students = row.original.students;
      const student = students.find((s) => s.id === '1');
      return student ? student.grades.prelim : 'N/A';
    },
  },
  {
    header: 'Midterm',
    cell: ({ row }) => {
      const students = row.original.students;
      const student = students.find((s) => s.id === '1');
      return student ? student.grades.midterm : 'N/A';
    },
  },

  {
    header: 'Prefinal',
    cell: ({ row }) => {
      const students = row.original.students;
      const student = students.find((s) => s.id === '1');
      return student ? student.grades.prefinal : 'N/A';
    },
  },

  {
    header: 'Final',
    cell: ({ row }) => {
      const students = row.original.students;
      const student = students.find((s) => s.id === '1');
      return student ? student.grades.final : 'N/A';
    },
  },
];
