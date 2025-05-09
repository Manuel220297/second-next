import { getLoggedInUser } from '../server/appwrite';
import getStudent from './getStudent';
import getTeacher from './getTeacher';

export default async function getStudentOrTeacher(): Promise<'student' | 'teacher' | 'unknown'> {
  const { user } = await getLoggedInUser();

  if (!user) return 'unknown';

  const { documents: teacher } = await getTeacher(user.id);
  const { documents: student } = await getStudent(user.id);

  if (student.length > 0) return 'student';
  if (teacher.length > 0) return 'teacher';

  return 'unknown';
}
