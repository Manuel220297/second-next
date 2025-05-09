'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { isValidPhoneNumber } from 'react-phone-number-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { createStudentAccount } from '@/lib/actions/createStudentAccount';
import { useRouter } from 'next/navigation';

// const phoneSchema = z.string().regex(/^(09\d{9}|\+639\d{9})$/, { message: 'Enter a valid Philippine phone number (e.g., 09123456789 or +639123456789).' });
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const formSchema = z.object({
  userId: z.string(),
  first_name: z.string().min(1, { message: 'First name must be at least 1 characters long' }).regex(nameRegex, { message: 'First name must contain letters only' }),

  last_name: z.string().min(1, { message: 'Last name must be at least 1 characters long' }).regex(nameRegex, { message: 'Last name must contain letters only' }),
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .email(),
  location: z.string().min(2, {
    message: 'Loaction must be at least 2 characters.',
  }),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ConfirmTeacherAccountPage({ defaultValues, userId, email }: { defaultValues?: Partial<FormValues>; userId: string; email: string }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId || '',
      first_name: defaultValues?.first_name || '',
      last_name: defaultValues?.last_name || '',
      email: email || '',
      location: defaultValues?.location || '',
      phone: defaultValues?.phone || '',
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/submit_account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, userType: 'teacher' }),
    });

    const data = await res.json();
    if (data.success) {
      console.log('Account submitted:', data.result);
      router.push('/');
    } else {
      console.error('Failed to submit account:', data.error);
    }
  }

  return (
    <Card className='w-full max-w-[920px] mx-auto shadow-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Personal Information as Teacher</CardTitle>
        <CardDescription>Please provide your information details below</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium'>Email</FormLabel>
                  <FormControl>
                    <Input disabled placeholder='Ex. kahitAno@gmail.com' className='bg-muted/50' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium'>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your first name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-medium'>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your last name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium'>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex. Brgy. Malitlit, Santa Rosa, Laguna' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-medium'>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput defaultCountry='PH' placeholder='Ex. 0919 469 5949' className='w-full' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type='submit' className='mt-4 w-full'>
              {form.formState.isSubmitting ? 'Submitting...' : 'Save Information'}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
