import getGrades from '@/lib/actions/getGrades';
import AppDashboard from '@/projects/components/AppDashboard';
import ClientWrapper from '@/projects/components/ClientWrapper';
import React from 'react';

const Dashboard = async () => {
  const grades = await getGrades();

  console.log(grades);
  return (
    <div>
      <AppDashboard></AppDashboard>
    </div>
  );
};

export default Dashboard;
