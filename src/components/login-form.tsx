'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaGoogle, FaGithub, FaSpinner } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
});

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/');
    } else {
      console.log(`Login failed: ${data.error}`);
      form.setError('email', {
        type: 'manual',
        message: 'Invalid Email or password ',
      });
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Login to your account</h1>
        <p className='text-muted-foreground text-sm text-balance'>Enter your email below to login to your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6' {...props}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  <a href='#' className='ml-auto text-xs underline-offset-4 hover:underline'>
                    Forgot your password?
                  </a>
                </FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} type='submit' className='w-full'>
            {form.formState.isSubmitting && <FaSpinner className='animate-spin' />}Login
          </Button>
        </form>
      </Form>

      {/* Social login buttons below the form */}
      <div className='grid gap-4'>
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>Or continue with</span>
        </div>
        <a href={'/api/github_oauth'}>
          <Button disabled={form.formState.isSubmitting} variant='outline' className='w-full'>
            {form.formState.isSubmitting && <FaSpinner className='animate-spin' />}
            <FaGithub />
            Login with GitHub
          </Button>
        </a>

        <a href={'/api/google_oauth'}>
          <Button disabled={form.formState.isSubmitting} variant='outline' className='w-full'>
            {form.formState.isSubmitting && <FaSpinner className='animate-spin' />}
            <FaGoogle />
            Login with Google
          </Button>
        </a>
      </div>

      <div className='text-center text-sm'>
        Don&apos;t have an account?
        <Link href='/signup' className='underline underline-offset-4'>
          Sign up
        </Link>
      </div>
    </div>
  );
}
