import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Grade } from '@/lib/actions/getGrades';
import Image from 'next/image';
import React from 'react';
import { Student } from '@/lib/actions/getStudent';

type StudentProps = Pick<Student, 'first_name' | 'last_name' | 'course' | 'gradeLevel'>;

const UserHeader = async ({ first_name, last_name, course, gradeLevel }: StudentProps) => {
  const imageCount = 2; //
  const randomIndex = Math.floor(Math.random() * imageCount);
  const imgSrc = `/images/profile/icon${randomIndex}.webp`;
  const fullName = `${first_name} ${last_name}`;

  return (
    <>
      <header className='flex flex-col w-full mx-auto'>
        {/* Header Image */}
        <div className='h-full relative '>
          <Image src={'/images/profile/wallpaper1.webp'} fill unoptimized alt='Background' className='object-center object-cover'></Image>
        </div>
        <div className='shadow-md dark:shadow-none dark:outline dark:outline-b-white flex md:px-24 h-[33%] relative justify-between'>
          <Avatar className='rounded-full top-[-5rem] md:top-[-6rem] left-[2rem] md:left-[8rem] size-42 md:size-48 border-white border-4 shadow-lg dark:shadow-white dark:shadow-md absolute'>
            <AvatarImage src={imgSrc} alt='profile icon'></AvatarImage>
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className='flex flex-col ml-62 py-4'>
            <h1 className='text-primary text-2xl md:text-4xl font-bold mb-2'>{fullName || 'Canog Manuel'}</h1>
            <p className='text-foreground text-sm'> {gradeLevel || 'Grade unknown'} </p>
            <p className='text-foreground text-sm'> {course || 'No Course'} </p>
          </div>
          <div className='flex flex-col lg:flex-row py-4 gap-4 px-8'>
            <Button variant='outline'>Overview</Button>
            <Button variant='outline'>Information</Button>
            <Button variant='outline'>Subjects</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
