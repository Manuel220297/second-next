import { GalleryVerticalEnd } from 'lucide-react';

import { LoginForm } from '@/components/login-form';
import Image from 'next/image';
import ImageLogin from './image';
import ModeToggle from '@/projects/components/ModeToggle';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const { isAuthenticated } = await getLoggedInUser();
  if (isAuthenticated) redirect('/');

  return (
    <div className='grid min-h-svh md:grid-cols-2 dark:bg-black'>
      <div className='bg-muted relative hidden md:block'>
        <ImageLogin></ImageLogin>
      </div>
      <div className='flex flex-col gap-4 p-6 md:p-10 relative'>
        <ModeToggle className='absolute right-10'></ModeToggle>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Asi-ackKKKK!!
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
