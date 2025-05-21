'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const joinSchema = z.object({
  subjectId: z.string().min(1, { message: 'Subject ID is required' }),
});

type JoinFormData = z.infer<typeof joinSchema>;

interface JoinSubjectFormProps {
  studentId: string; // Pass this from the parent component or session
}

export default function JoinSubjectForm({ studentId }: JoinSubjectFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      subjectId: '',
    },
  });

  const onSubmit = async (data: JoinFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/join_subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, subjectId: data.subjectId }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Joined subject successfully!');
        form.reset();
      } else {
        toast.error(`Failed: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 max-w-md'>
        <FormField
          control={form.control}
          name='subjectId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject ID</FormLabel>
              <FormControl>
                <Input placeholder='Enter Subject ID' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={loading}>
          {loading ? 'Joining...' : 'Join Subject'}
        </Button>
      </form>
    </Form>
  );
}
