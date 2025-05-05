import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Grade } from '@/lib/actions/getGrades';
import Image from 'next/image';
import React from 'react';

const UserHeader = async ({ first_name }: { first_name?: string }) => {
  const imageCount = 2; //
  const randomIndex = Math.floor(Math.random() * imageCount);
  const imgSrc = `/images/profile/icon${randomIndex}.webp`;

  return (
    <>
      <header className='flex flex-col w-full mx-auto'>
        {/* Header Image */}
        <div className='h-full relative '>
          <Image src={'/images/profile/wallpaper1.webp'} fill unoptimized alt='Background' className='object-center object-cover'></Image>
        </div>
        <div className='shadow-md dark:shadow-none dark:outline dark:outline-b-white flex mdl:px-24 h-[33%] relative justify-between'>
          <Avatar className='rounded-full top-[-5rem] mdl:top-[-6rem] left-[2rem] mdl:left-[8rem] size-42 mdl:size-48 border-white border-4 shadow-lg dark:shadow-white dark:shadow-md absolute'>
            <AvatarImage src={imgSrc} alt='profile icon'></AvatarImage>
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className='flex flex-col ml-62 py-4'>
            <h1 className='text-primary text-2xl mdl:text-4xl font-bold'>{first_name || 'Canog Manuel'}</h1>
            <p className='text-foreground'> Bachelor of Information Technology</p>
          </div>
          <div className='flex flex-col mdl:flex-row py-4 gap-4 px-8'>
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
