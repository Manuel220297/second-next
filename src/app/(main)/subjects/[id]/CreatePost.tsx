'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  pdfile: z.string().url('Must be an url'),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  authorId: string;
  subjectId: string;
};

export default function CreatePost({ authorId, subjectId }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      pdfile: '',
    },
  });

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    const res = await fetch('/api/create_post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, authorId, subjectId }),
    });

    if (res.ok) {
      console.log(res);
    }
    form.reset({
      title: '',
      content: '',
      pdfile: '',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='w-full max-w-2xl mx-auto bg-card'>
          <CardHeader className='flex flex-row items-center justify-between p-4 border-b'>
            <h2 className='text-xl font-semibold'>Create Learning Material</h2>
            <Button type='button' variant='ghost' size='icon' className='rounded-full'>
              <X className='h-5 w-5' />
            </Button>
          </CardHeader>

          <CardContent className='p-4 space-y-4'>
            <div className='flex items-start gap-3'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src='/placeholder.svg?height=40&width=40' alt='Teacher' />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>

              <div className='flex-1 space-y-3'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Title of the material' className='font-medium text-lg' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder='Add description' className='min-h-[120px] resize-none' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='pdfile'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Pdfile Link' className='font-medium text-lg' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className='p-4 border-t'>
            <Button type='submit' className='w-full' size='lg'>
              <Send className='mr-2 h-4 w-4' />
              Post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
