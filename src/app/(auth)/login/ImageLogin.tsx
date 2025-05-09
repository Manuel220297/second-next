'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

const ImageLogin = () => {
  const { theme } = useTheme();

  const imageCount = 4;
  const randomIndex = Math.floor(Math.random() * imageCount);

  const imageSrc = theme === 'dark' ? `/images/dark/${randomIndex}.webp` : `/images/light/${randomIndex}.webp`;

  console.log('🚀 ~ ImageLogin ~ imageSrc:', imageSrc);
  return (
    <>
      <Image src={imageSrc} unoptimized fill alt='Image' className='absolute inset-0 h-full w-full object-cover' />
    </>
  );
};

export default ImageLogin;
