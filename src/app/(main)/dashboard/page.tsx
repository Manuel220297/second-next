import AppDashboard from '@/projects/components/AppDashboard';
import { AutoBreadcrumb } from '@/projects/components/AutoBreadcrumb';
import ClientWrapper from '@/projects/components/ClientWrapper';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <AutoBreadcrumb className='ml-4 hidden md:block font-[600]' />
      <AppDashboard></AppDashboard>
    </div>
  );
};

export default Dashboard;
