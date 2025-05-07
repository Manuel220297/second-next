'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { submitAccount } from '@/lib/actions/submitAccount';

// const phoneSchema = z.string().regex(/^(09\d{9}|\+639\d{9})$/, { message: 'Enter a valid Philippine phone number (e.g., 09123456789 or +639123456789).' });

const formSchema = z.object({
  userId: z.string(),
  first_name: z.string().min(1, {
    message: 'First name must contain characters.',
  }),
  last_name: z.string().min(1, {
    message: 'Last name must contain characters.',
  }),
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

export function AppAccountPage({ defaultValues, userId }: { defaultValues?: Partial<FormValues>; userId: string }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId || '',
      first_name: defaultValues?.first_name || '',
      last_name: defaultValues?.last_name || '',
      email: defaultValues?.email || '',
      location: defaultValues?.location || '',
      phone: defaultValues?.phone || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/submit_account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (data.success) {
      console.log('Account submitted:', data.result);
    } else {
      console.error('Failed to submit account:', data.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
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
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Ex. kahitAno@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
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
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry='PH' placeholder='Ex. 0919 469 5949' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
