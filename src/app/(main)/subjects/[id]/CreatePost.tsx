'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRef } from 'react';

// Create a schema with conditional validation
const formSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    pdfType: z.enum(['file', 'url']),
    pdfile: z.any().optional(),
    pdfurl: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate based on the selected tab
    if (data.pdfType === 'file') {
      // Check if file is provided and is a PDF
      if (!(data.pdfile instanceof FileList) || data.pdfile.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please upload a PDF file',
          path: ['pdfile'],
        });
      } else if (data.pdfile[0].type !== 'application/pdf') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File must be a PDF',
          path: ['pdfile'],
        });
      }
    } else if (data.pdfType === 'url') {
      // Check if URL is provided and valid
      if (!data.pdfurl || data.pdfurl.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a URL',
          path: ['pdfurl'],
        });
      } else if (!z.string().url().safeParse(data.pdfurl).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid URL',
          path: ['pdfurl'],
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

type Props = {
  authorId: string;
  subjectId: string;
  onPostSuccess?: () => void;
};

export default function CreatePost({ authorId, subjectId, onPostSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfType, setPdfType] = useState<'file' | 'url'>('file');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      pdfType: 'file',
      pdfile: undefined,
      pdfurl: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('authorId', authorId);
    formData.append('subjectId', subjectId);

    if (values.pdfType === 'url' && values.pdfurl) {
      formData.append('pdfurl', values.pdfurl);
    }

    if (values.pdfType === 'file' && values.pdfile && values.pdfile.length > 0) {
      formData.append('pdfile', values.pdfile[0]);
    }

    try {
      const res = await fetch('/api/create_post', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        onPostSuccess?.();
        form.reset();

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleTabChange = (value: 'file' | 'url') => {
    setPdfType(value);
    form.setValue('pdfType', value, { shouldValidate: true });

    // Clear the other field when switching tabs
    if (value === 'file') {
      form.setValue('pdfurl', '');
    } else {
      form.setValue('pdfile', undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='w-full max-w-2xl mx-auto bg-card'>
          <CardHeader className='flex flex-row items-center justify-between p-4 border-b'>
            <h2 className='text-xl font-semibold'>Create Learning Material</h2>
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

                <div className='space-y-2'>
                  <Tabs defaultValue='file' value={pdfType} onValueChange={(value) => handleTabChange(value as 'file' | 'url')} className='w-full'>
                    <TabsList className='grid w-full grid-cols-2'>
                      <TabsTrigger value='file'>Upload PDF</TabsTrigger>
                      <TabsTrigger value='url'>PDF URL</TabsTrigger>
                    </TabsList>
                    <TabsContent value='file' className='mt-4'>
                      <FormField
                        control={form.control}
                        name='pdfile'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type='file'
                                accept='application/pdf'
                                ref={(el) => {
                                  field.ref(el);
                                  fileInputRef.current = el;
                                }}
                                onChange={(e) => field.onChange(e.target.files)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value='url' className='mt-4'>
                      <FormField
                        control={form.control}
                        name='pdfurl'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder='PDF Link' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
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
