'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the form schema with zod
const formSchema = z.object({
  scheduleDay: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),

  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  scheduleStart: z.string().min(5, { message: 'Pick a time' }).max(5, { message: 'Pick a time' }),
  scheduleEnd: z.string().min(5, { message: 'Pick a time' }).max(5, { message: 'Pick a time' }),
  room: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  teachers: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateSubject({ documentId }: any) {
  // Initialize react-hook-form with zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      scheduleStart: '',
      scheduleEnd: '',
      scheduleDay: undefined,
      room: '',
      teachers: documentId,
    },
  });

  // Form submission handler
  async function onSubmit(values: FormValues) {
    console.log(values);
    const res = await fetch('/api/create_subject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(`Test`, data);
    } else {
      console.log(data.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the subject</FormLabel>
              <FormControl>
                <Input placeholder='Enter your full name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='scheduleStart'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule time start</FormLabel>
              <FormControl>
                <Input type='time' placeholder='time' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='scheduleEnd'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule time end</FormLabel>
              <FormControl>
                <Input type='time' placeholder='time' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='scheduleDay'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-medium'>Day</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a day' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='monday'>Monday</SelectItem>
                    <SelectItem value='tuesday'>Tuesday</SelectItem>
                    <SelectItem value='wednesday'>Wednesday</SelectItem>
                    <SelectItem value='thursday'>Thursday</SelectItem>
                    <SelectItem value='friday'>Friday</SelectItem>
                    <SelectItem value='saturday'>Saturday</SelectItem>
                    <SelectItem value='sunday'>Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='room'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Room name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Click
        </Button>
      </form>
    </Form>
  );
}
