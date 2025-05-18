'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { isValidPhoneNumber } from 'react-phone-number-input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { createStudentAccount } from '@/lib/actions/createStudentAccount';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';

// const phoneSchema = z.string().regex(/^(09\d{9}|\+639\d{9})$/, { message: 'Enter a valid Philippine phone number (e.g., 09123456789 or +639123456789).' });
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

const baseFormSchema = {
  userId: z.string(),
  first_name: z.string().min(1, { message: 'First name must be at least 1 character long' }).regex(nameRegex, { message: 'First name must contain letters only' }),
  last_name: z.string().min(1, { message: 'Last name must be at least 1 character long' }).regex(nameRegex, { message: 'Last name must contain letters only' }),
  email: z.string().min(2, { message: 'Email must be at least 2 characters.' }).email(),
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Invalid phone number' }),
};

const teacherFormSchema = z.object({
  ...baseFormSchema,
  specialization: z.string().min(2, { message: 'Specialization must be at least 2 characters.' }),
  experience: z.string().min(1, { message: 'Experience is required.' }),
  employment_status: z.enum(['Full-time', 'Part-time', 'Contractual'], {
    required_error: 'Employment status is required.',
  }),
});

const studentFormSchema = z.object({
  ...baseFormSchema,
  gradeLevel: z.enum(
    [
      'Kindergarten',
      'Preschool',
      'Elemenary-1',
      'Elemenary-2',
      'Elemenary-3',
      'Elemenary-4',
      'Elemenary-5',
      'Elemenary-6',
      'JuniorHigh-1',
      'JuniorHigh-2',
      'JuniorHigh-3',
      'JuniorHigh-4',
      'SeniorHigh-1',
      'SeniorHigh-2',
      'Assiociate-1',
      'Assiociate-2',
      'Bachelor-1',
      'Bachelor-2',
      'Bachelor-3',
      'Bachelor-4',
    ],
    {
      required_error: 'Grade level is required.',
    }
  ),
  course: z.enum(
    [
      'accountancy',
      'business_administration',
      'entrepreneurship',
      'tourism_management',
      'hospitality_management',
      'criminology',
      'computer_engineering',
      'computer_science',
      'information_technology',
      'information_system',
      'education_english',
      'education_math',
      'education_social_science',
      'hotel_and_restaurant_management',
    ],
    {
      required_error: 'Course is required.',
    }
  ),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;
type TeacherFormValues = z.infer<typeof teacherFormSchema>;

export function ConfirmAccountPage({ defaultValues, userId, email }: { defaultValues?: Partial<StudentFormValues | TeacherFormValues>; userId: string; email: string }) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const router = useRouter();

  const studentForm = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      userId: userId || '',
      first_name: defaultValues?.first_name || '',
      last_name: defaultValues?.last_name || '',
      email: email || '',
      location: defaultValues?.location || '',
      phone: defaultValues?.phone || '',
      gradeLevel: undefined,
      course: undefined,
    },
  });

  const teacherForm = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      userId: userId || '',
      first_name: defaultValues?.first_name || '',
      last_name: defaultValues?.last_name || '',
      email: email || '',
      location: defaultValues?.location || '',
      phone: defaultValues?.phone || '',
      specialization: '',
      experience: '',
      employment_status: undefined,
    },
  });

  async function onSubmitStudent(values: StudentFormValues) {
    console.log('Testing', role);

    await submitForm(values);
  }

  async function onSubmitTeacher(values: TeacherFormValues) {
    console.log('Testing', role);
    await submitForm(values);
  }

  async function submitForm(values: StudentFormValues | TeacherFormValues) {
    const res = await fetch('/api/submit_account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, userType: role }),
    });

    const data = await res.json();
    if (data.success) {
      console.log('Account submitted:', data.result);
      router.push('/');
    } else {
      console.error('Failed to submit account:', data.error);
    }
  }

  return (
    <Card className='w-full max-w-[920px] mx-auto shadow-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Personal Information</CardTitle>
        <CardDescription>Please provide your information details below</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='student' onValueChange={(value) => setRole(value as 'student' | 'teacher')}>
          <TabsList className='grid w-full grid-cols-2 mb-6'>
            <TabsTrigger value='student'>Student</TabsTrigger>
            <TabsTrigger value='teacher'>Teacher</TabsTrigger>
          </TabsList>

          <TabsContent value='student'>
            <Form {...studentForm}>
              <form onSubmit={studentForm.handleSubmit(onSubmitStudent)} className='space-y-4'>
                <FormField
                  control={studentForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Email</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Ex. kahitAno@gmail.com' className='bg-muted/50' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={studentForm.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium'>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your first name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={studentForm.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium'>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your last name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={studentForm.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='Ex. Brgy. Malitlit, Santa Rosa, Laguna' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={studentForm.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput defaultCountry='PH' placeholder='Ex. 0919 469 5949' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name='gradeLevel'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Grade Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select grade level' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Kindergarten'>Kindergarten</SelectItem>
                            <SelectItem value='Preschool'>Preschool</SelectItem>
                            <SelectItem value='Elementary-1'>Elementary-1</SelectItem>
                            <SelectItem value='Elementary-2'>Elementary-2</SelectItem>
                            <SelectItem value='Elementary-3'>Elementary-3</SelectItem>
                            <SelectItem value='Elementary-4'>Elementary-4</SelectItem>
                            <SelectItem value='Elementary-5'>Elementary-5</SelectItem>
                            <SelectItem value='Elementary-6'>Elementary-6</SelectItem>
                            <SelectItem value='JuniorHigh-1'>JuniorHigh-1</SelectItem>
                            <SelectItem value='JuniorHigh-2'>JuniorHigh-2</SelectItem>
                            <SelectItem value='JuniorHigh-3'>JuniorHigh-3</SelectItem>
                            <SelectItem value='JuniorHigh-4'>JuniorHigh-4</SelectItem>
                            <SelectItem value='SeniorHigh-1'>SeniorHigh-1</SelectItem>
                            <SelectItem value='SeniorHigh-2'>SeniorHigh-2</SelectItem>
                            <SelectItem value='Assiociate-1'>Assiociate-1</SelectItem>
                            <SelectItem value='Assiociate-2'>Assiociate-2</SelectItem>
                            <SelectItem value='Bachelor-1'>Bachelor-1</SelectItem>
                            <SelectItem value='Bachelor-2'>Bachelor-2</SelectItem>
                            <SelectItem value='Bachelor-3'>Bachelor-3</SelectItem>
                            <SelectItem value='Bachelor-4'>Bachelor-4</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={studentForm.control}
                  name='course'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Course</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select course' />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              'accountancy',
                              'business_administration',
                              'entrepreneurship',
                              'tourism_management',
                              'hospitality_management',
                              'criminology',
                              'computer_engineering',
                              'computer_science',
                              'information_technology',
                              'information_system',
                              'education_english',
                              'education_math',
                              'education_social_science',
                              'hotel_and_restaurant_management',
                            ].map((course) => (
                              <SelectItem key={course} value={course}>
                                {course.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={studentForm.formState.isSubmitting} type='submit' className='mt-4 w-full'>
                  {studentForm.formState.isSubmitting ? 'Submitting...' : 'Save Information'}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value='teacher'>
            <Form {...teacherForm}>
              <form
                onSubmit={teacherForm.handleSubmit(onSubmitTeacher, (errors) => {
                  console.log('Validation errors:', errors);
                })}
                className='space-y-4'>
                <FormField
                  control={teacherForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Email</FormLabel>
                      <FormControl>
                        <Input disabled placeholder='Ex. kahitAno@gmail.com' className='bg-muted/50' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={teacherForm.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium'>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your first name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={teacherForm.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium'>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter your last name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={teacherForm.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='Ex. Brgy. Malitlit, Santa Rosa, Laguna' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput defaultCountry='PH' placeholder='Ex. 0919 469 5949' className='w-full' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name='specialization'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Specialization</FormLabel>
                      <FormControl>
                        <Input placeholder='Ex. Mathematics, Science, English' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name='experience'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Years of Experience</FormLabel>
                      <FormControl>
                        <Input placeholder='Ex. 5 years' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={teacherForm.control}
                  name='employment_status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Employment Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder='Select employment status' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='Full-time'>Full-time</SelectItem>
                            <SelectItem value='Part-time'>Part-time</SelectItem>
                            <SelectItem value='Contractual'>Contractual</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button onClick={() => console.log(teacherForm.getValues())} disabled={teacherForm.formState.isSubmitting} type='submit' className='mt-4 w-full'>
                  {teacherForm.formState.isSubmitting ? 'Submitting...' : 'Save Information'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
