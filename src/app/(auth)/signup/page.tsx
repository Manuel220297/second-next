import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import getStudent from '@/lib/actions/getStudent';
import getTeacher from '@/lib/actions/getTeacher';
import { getLoggedInUser } from '@/lib/server/appwrite';
import RegistrationForm from '@/projects/components/registration-form';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const { user } = await getLoggedInUser();

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen py-12'>
        <div className='w-full max-w-md space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Create an Account</h1>
            <p className='text-muted-foreground'>Choose your account type to register</p>
          </div>
          <div className='w-full'>
            <div className='p-4 pt-6 border rounded-lg shadow-sm'>
              <h2 className='mb-4 text-xl font-semibold'>Registration</h2>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const { documents: student } = await getStudent(user.id);
  const { documents: teacher } = await getTeacher(user.id);

  if (student.length > 0 || teacher.length > 0) {
    return redirect('/');
  }

  // ✅ Render form again for logged-in users without a student/teacher account
  return (
    <div className='flex items-center justify-center min-h-screen py-12'>
      <div className='w-full max-w-md space-y-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Create an Account</h1>
          <p className='text-muted-foreground'>Choose your account type to register</p>
        </div>
        <div className='w-full'>
          <div className='p-4 pt-6 border rounded-lg shadow-sm'>
            <h2 className='mb-4 text-xl font-semibold'>Registration</h2>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
