'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar1 } from 'lucide-react';

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <Popover>
        <PopoverTrigger asChild className='w-full border rounded-sm'>
          <Button variant='outline'>
            <Calendar1></Calendar1>
            {date ? date?.toDateString() : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md ' />
        </PopoverContent>
      </Popover>
    </>
  );
}
