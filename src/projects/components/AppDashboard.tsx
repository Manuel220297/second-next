import { Button } from '@/components/ui/button';
import React from 'react';
import AppBarChart from './AppBarChart';
import AppAreaChart from './AppAreaChart';
import CardList from './CardList';

type Props = {};

const AppDashboard = ({}: Props) => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>
          <AppBarChart></AppBarChart>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>
          <AppAreaChart></AppAreaChart>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'></div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>
          <CardList title='List of people'></CardList>
        </div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>Testing</div>
        <div className='bg-primary-foreground p-4 rounded-lg shadow-sm'>Testing</div>
      </div>
    </>
  );
};

export default AppDashboard;
