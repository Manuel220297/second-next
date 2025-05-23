import { CalendarClock, GraduationCap, ScrollText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WelcomeBanner from './welcome-banner';
import TodaySchedule from './today-schedule';
import UpcomingAssignments from './upcoming-assignment';
import GradesTable from './grade-table';

export default function AppStudentPage() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <WelcomeBanner />

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='lg:col-span-2'>
            <CardHeader className='flex flex-row items-center space-y-0'>
              <div className='flex flex-1 flex-col'>
                <CardTitle>Subject Schedule</CardTitle>
              </div>
              <CalendarClock className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <TodaySchedule />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center space-y-0'>
              <div className='flex flex-1 flex-col'>
                <CardTitle>Upcoming Assignments</CardTitle>
              </div>
              <ScrollText className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <UpcomingAssignments />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className='flex flex-row items-center space-y-0'>
            <div className='flex flex-1 flex-col'>
              <CardTitle>Grades Overview</CardTitle>
            </div>
            <GraduationCap className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <GradesTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
