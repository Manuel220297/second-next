import { Button } from '@/components/ui/button';
import React from 'react';
import AppBarChart from './AppBarChart';
import AppAreaChart from './AppAreaChart';
import CardList from './CardList';
import TodoList from './TodoList';

type Props = {};

const AppDashboard = ({}: Props) => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm lg:col-span-3 xl:col-span-2'>
          <AppBarChart></AppBarChart>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm lg:col-span-2'>
          <AppAreaChart></AppAreaChart>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>
          <CardList title='List of people'></CardList>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>
          <TodoList></TodoList>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>Testing</div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>Testing</div>
      </div>
    </>
  );
};

export default AppDashboard;
