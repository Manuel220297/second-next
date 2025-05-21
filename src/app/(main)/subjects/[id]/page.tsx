import React from 'react';
import AppSubjectPage from './AppSubjectPage';
import getSubjects from '@/lib/actions/getSubjects';
import getStudent from '@/lib/actions/getStudent';
import { getLoggedInUser } from '@/lib/server/appwrite';
import getStudentLists from '@/lib/actions/getStudentLists';
import getTeacher from '@/lib/actions/getTeacher';

const SubjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { user } = await getLoggedInUser();
  const allStudents = await getStudentLists();

  if (!user) {
    return <>You are not logged in</>;
  }
  const { documents: teacher } = await getTeacher(user?.id);
  const isTeacher = !!teacher;

  const { documents: subject } = await getSubjects(id);
  const students = subject[0].students;
  const teacherFullName = `${subject[0].teachers.first_name} ${subject[0].teachers.last_name}`;

  function formatTime(timeString: string | null): string {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  const formattedScheduleStart = formatTime(subject[0].scheduleStart!);
  const formattedScheduleEnd = formatTime(subject[0].scheduleEnd!);
  const schedule = `${formattedScheduleStart} - ${formattedScheduleEnd} ${subject[0].scheduleDay ? subject[0].scheduleDay.charAt(0).toUpperCase() + subject[0].scheduleDay.slice(1) : ''}`;

  return (
    <>
      <AppSubjectPage allStudents={allStudents} name={subject[0].name} schedule={schedule} students={students} teacher={teacherFullName} id={id} isTeacher={isTeacher}></AppSubjectPage>
    </>
  );
};

export default SubjectPage;
