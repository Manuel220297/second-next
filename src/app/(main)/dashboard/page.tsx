import AppDashboard from '@/projects/components/AppDashboard';
import AppStudentPage from '@/projects/components/AppStudentPage';
import AppTeacherPage from '@/projects/components/AppTeacherPage';
import ClientWrapper from '@/projects/components/ClientWrapper';
import React from 'react';

const Dashboard = async () => {
  return (
    <div>
      <AppTeacherPage></AppTeacherPage>
      {/* <AppStudentPage></AppStudentPage> */}
      {/* <AppDashboard></AppDashboard> */}
    </div>
  );
};

export default Dashboard;
