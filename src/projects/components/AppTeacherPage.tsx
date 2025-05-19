import { BookOpen, CalendarClock, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WelcomeBanner from './welcome-banner';
import TodayScheduleT from './today-scheduleT';
import ClassPerformanceT from './class-performance';
import AttendanceOverviewT from './attendance-overview';
import RecentSubmissions from './recent-submission';

export default function AppTeacherPage() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <WelcomeBanner />

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='lg:col-span-2'>
            <CardHeader className='flex flex-row items-center space-y-0'>
              <div className='flex flex-1 flex-col'>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your teaching schedule for today</CardDescription>
              </div>
              <CalendarClock className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <TodayScheduleT />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center space-y-0'>
              <div className='flex flex-1 flex-col'>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Grading and preparation tasks</CardDescription>
              </div>
              <BookOpen className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader className='flex flex-row items-center space-y-0'>
              <div className='flex flex-1 flex-col'>
                <CardTitle>Class Performance</CardTitle>
              </div>
              <GraduationCap className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <ClassPerformanceT />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center space-y-0'>
              <div className='flex flex-1 flex-col'>
                <CardTitle>Attendance Overview</CardTitle>
              </div>
              <Users className='h-5 w-5 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <AttendanceOverviewT />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Assignments pending review</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSubmissions />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
