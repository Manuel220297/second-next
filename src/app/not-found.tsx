import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import ModeToggle from '@/projects/components/ModeToggle';

export default function NotFoundPage() {
  return (
    <>
      <div className='text-gray-600 dark:text-white dark:text-shadow-white text-shadow-sm flex justify-center align-middle items-center h-[100vh]'>
        <ModeToggle />
        <h1 className='text-3xl font-light border-r py-12 pr-6 mr-6'>
          <span className='text-4xl mx-4 font-medium'>404</span>Page Not Found
        </h1>
        <a className='text-xl hover:outline px-6 py-3 rounded-md hover:text-shadow-white hover:text-shadow-lg  ease-out duration-200' href='/'>
          <ArrowLeftCircle className='inline'></ArrowLeftCircle> Go back to Home
        </a>
      </div>
    </>
  );
}
