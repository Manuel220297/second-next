import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { count } from 'console';
import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
};
const peoples = [
  {
    id: 1,
    name: 'Alice Johnson',
    title: 'Frontend Developer',
    badge: 'Full-time',
    image: 'https://github.com/shadcn.png',
    count: 1111,
  },
  {
    id: 2,
    name: 'Marcus Lee',
    title: 'UI/UX Designer',
    badge: 'Contract',
    image: 'https://github.com/shadcn.png',
    count: 1123,
  },
  {
    id: 3,
    name: 'Sophia Turner',
    title: 'Backend Developer',
    badge: 'Part-time',
    image: 'https://github.com/shadcn.png',
    count: 1325,
  },
  {
    id: 4,
    name: 'Ethan Brown',
    title: 'DevOps Engineer',
    badge: 'Full-time',
    image: 'https://github.com/shadcn.png',
    count: 520,
  },
  {
    id: 5,
    name: 'Isabella White',
    title: 'Product Manager',
    badge: 'Freelance',
    image: 'https://github.com/shadcn.png',
    count: 2241,
  },
];

const CardList = ({ title }: Props) => {
  const lists = peoples;
  return (
    <>
      <h1 className='text-lg font-medium mb-6'> {title} </h1>
      <div className='flex flex-col gap-2'>
        {lists.map((list) => {
          return (
            <Card key={list.id} className='flex flex-row items-center px-4 gap-4'>
              <div className='rounded-md min-w-8'>
                <Image className='rounded-md size-6 md:size-8' src={list.image} alt='image' width={32} height={32} />
              </div>
              <CardContent className='p-0'>
                <CardTitle className='md:text-lg p-0'>{list.name}</CardTitle>

                <Badge variant={'secondary'} className='p-0'>
                  <p className='text-xs p-0.5 md:text-sm text-muted-foreground'>
                    {list.title}, {list.badge}
                  </p>
                </Badge>
              </CardContent>
              <CardFooter className='ml-auto p-0'>{list.count >= 1000 ? (list.count / 1000).toFixed(1) + 'K' : list.count}</CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default CardList;
