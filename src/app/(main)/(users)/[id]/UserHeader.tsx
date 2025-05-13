import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Grade } from '@/lib/actions/getGrades';
import Image from 'next/image';
import React from 'react';
import { Student } from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type StudentProps = Pick<Student, 'first_name' | 'last_name' | 'course' | 'gradeLevel' | 'avatar' | 'wallpaper' | 'id'>;

const UserHeader = async ({ first_name, last_name, course, gradeLevel, avatar, wallpaper, id }: StudentProps) => {
  const random = Math.random();
  let defaultImage = '';
  if (random < 0.05) {
    defaultImage = `/images/profile/icon${1}.webp`;
  } else if (random < 0.4) {
    defaultImage = `/images/profile/icon${0}.webp`;
  } else if (random < 0.85) {
    defaultImage = `/images/profile/icon${2}.webp`;
  } else {
    defaultImage = `/images/profile/icon${3}.webp`;
  }
  const fullName = `${first_name} ${last_name}`;

  return (
    <>
      <header className='flex flex-col w-full sm:w-[90%] mx-auto sm:rounded-xl border border-primary/10'>
        {/* Header Image */}
        <div className='h-full relative sm:rounded-xl'>
          <Image src={wallpaper || '/images/profile/wallpaper1.webp'} fill unoptimized alt='Background' className='object-center object-cover sm:rounded-t-xl'></Image>
        </div>
        <div className='sm:rounded-b-xl shadow-md dark:shadow-none sm:dark:outline-b-white flex sm:flex-row flex-col md:px-24 h-[100%] 2xl:h-[30%] relative justify-between'>
          <Avatar className='rounded-full top-[-5rem] md:top-[-6rem] -translate-x-1/2 sm:translate-x-0 left-1/2 sm:left-[2rem] md:left-[8rem] size-42 md:size-48 border-white border-4 shadow-lg dark:shadow-white dark:shadow-md absolute'>
            <AvatarImage src={avatar || defaultImage} alt='profile icon'></AvatarImage>
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className='flex flex-col align-middle items-center sm:items-start mx-auto sm:mx-0 sm:ml-62 py-4'>
            <h1 className='text-primary text-2xl md:text-3xl 2xl:text-4xl font-bold mt-[5rem] sm:mt-0 mb-2'>{fullName || 'John Dung'}</h1>
            <p className='text-foreground text-sm mb-2'> {gradeLevel || 'Grade unknown'} </p>
            <p className='text-foreground text-sm'>
              <Badge variant={'secondary'} className='p-1 px-2 font-semibold'>
                {course || 'No Course'}
              </Badge>
            </p>
          </div>
          <div className='hidden sm:flex flex-row sm:flex-col lg:flex-row sm:py-4 sm:gap-4 sm:px-8 mx-auto gap-1 sm:mx-0'>
            <Button asChild className='px-1.5' variant='outline'>
              <Link href={`/${id}`}>Overview</Link>
            </Button>
            <Button asChild className='px-1.5' variant='outline'>
              <Link href={`/${id}/information`}>Information</Link>
            </Button>
            <Button asChild className='px-1.5' variant='outline'>
              <Link href={'/subjects'}>Subjects</Link>
            </Button>
            <Button asChild className='px-1.5' variant='outline'>
              <Link href={`/${id}/transaction`}>Transactions</Link>
            </Button>
          </div>
          <div className='flex sm:hidden px-4 py-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='w-full'>
                  View more
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-full'>
                <DropdownMenuItem asChild>
                  <Link className='px-4 py-3' href={`/${id}`}>
                    Overview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className='px-4 py-3' href={`/${id}/information`}>
                    Information
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className='px-4 py-3' href='/subjects'>
                    Subjects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className='px-4 py-3' href={`/${id}/transaction`}>
                    Transactions
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
