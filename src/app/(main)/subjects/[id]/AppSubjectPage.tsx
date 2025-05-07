'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarDays, FileText, MessageSquare, PlusCircle, Users, BookOpen, Calendar, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Student } from '@/lib/actions/getStudent';

type Props = {
  name: string;
  schedule?: string;
  students?: Student[];
};

const AppSubjectPage = ({ name, schedule, students }: Props) => {
  const [activeTab, setActiveTab] = useState('stream');

  // Fake persons
  const announcements = [
    {
      id: 1,
      author: 'Mr. Testing',
      avatar: '/placeholder.svg?height=40&width=40',
      date: 'May 5, 2025',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, repellat!',
      comments: 0,
    },
    {
      id: 2,
      author: 'Mr. Testing lang',
      avatar: '/placeholder.svg?height=40&width=40',
      date: 'May 4, 2025',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ex eum nulla. Officia praesentium repellendus iste, earum delectus dolorum fugit dolore tempora inventore autem deleniti?',
      comments: 0,
    },
  ];

  const assignments = [
    {
      id: 1,
      title: 'Kahit ano',
      dueDate: 'May 10, 2025',
      points: 100,
      status: 'Assigned',
    },
    {
      id: 2,
      title: 'Testing testing one two three',
      dueDate: 'May 15, 2025',
      points: 50,
      status: 'Assigned',
    },
    {
      id: 3,
      title: 'Kahit saan',
      dueDate: 'May 12, 2025',
      points: 30,
      status: 'Assigned',
    },
  ];

  const people = [
    { id: 1, name: 'Mrs. Johnson', role: 'Teacher', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'John Smith', role: 'Student', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Emily Davis', role: 'Student', avatar: '/placeholder.svg?height=40&width=40' },
  ];

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Class Header */}
      <div className='relative mb-6'>
        <div className='h-40 w-full rounded-t-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-end'>
          <div className='p-6 text-white'>
            <h1 className='text-3xl font-bold'>{name}</h1>
            {schedule && <p className='text-white/80 mt-1'>{schedule}</p>}
          </div>
        </div>
        <div className='bg-card rounded-b-lg border shadow-sm p-4 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Badge variant='outline' className='bg-blue-50 hidden lg:flex text-blue-700 border-blue-200'>
              <Calendar className='mr-1 h-3 w-3' />
              {schedule || 'MWF 10:00 AM'}
            </Badge>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              <Calendar className='mr-2 h-4 w-4' />
              Calendar
            </Button>
            {/* <Button variant='outline' size='sm'>
              <BookOpen className='mr-2 h-4 w-4' />
              Materials
            </Button> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue='stream' className='w-full' onValueChange={setActiveTab}>
        <TabsList className='mb-6 grid w-full grid-cols-4 max-w-2xl'>
          <TabsTrigger className='text-xs md:text-sm' value='stream'>
            <MessageSquare className='' />
            Stream
          </TabsTrigger>
          <TabsTrigger className='text-xs md:text-sm' value='classwork'>
            <FileText className='' />
            Classwork
          </TabsTrigger>
          <TabsTrigger className='text-xs md:text-sm' value='people'>
            <Users className='' />
            People
          </TabsTrigger>
          <TabsTrigger className='text-xs md:text-sm' value='grades'>
            <CalendarDays className='' />
            Grades
          </TabsTrigger>
        </TabsList>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className={`md:col-span-3 space-y-6 ${activeTab !== 'stream' && activeTab !== 'classwork' ? 'md:col-span-4' : ''}`}>
            <TabsContent value='stream' className='space-y-6'>
              <Card>
                <CardHeader className='pb-3'>
                  <div className='flex justify-between items-center'>
                    <CardTitle>Announcements</CardTitle>
                    <Button variant='outline' size='sm'>
                      <PlusCircle className='mr-2 h-4 w-4' />
                      Announce
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className='border rounded-lg p-4'>
                      <div className='flex items-start gap-3'>
                        <Avatar>
                          <AvatarImage src={announcement.avatar || '/placeholder.svg'} alt={announcement.author} />
                          <AvatarFallback>{announcement.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                          <div className='flex justify-between'>
                            <div>
                              <h3 className='font-medium'>{announcement.author}</h3>
                              <p className='text-sm text-muted-foreground'>{announcement.date}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon' className='h-8 w-8'>
                                  <MoreVertical className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className='mt-2'>{announcement.content}</p>
                          <div className='mt-4 flex items-center gap-2'>
                            <Button variant='ghost' size='sm'>
                              <MessageSquare className='mr-2 h-4 w-4' />
                              {announcement.comments} comments
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='classwork' className='space-y-6'>
              <Card>
                <CardHeader className='pb-3'>
                  <div className='flex justify-between items-center'>
                    <CardTitle>Assignments</CardTitle>
                    <Button variant='outline' size='sm'>
                      <PlusCircle className='mr-2 h-4 w-4' />
                      Create
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className='flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors'>
                        <div className='flex items-center gap-3'>
                          <div className='bg-primary/10 p-2 rounded-full'>
                            <FileText className='h-5 w-5 text-primary' />
                          </div>
                          <div>
                            <h3 className='font-medium'>{assignment.title}</h3>
                            <p className='text-sm text-muted-foreground'>
                              Due {assignment.dueDate} • {assignment.points} points
                            </p>
                          </div>
                        </div>
                        <Badge variant={assignment.status === 'Assigned' ? 'outline' : 'default'}>{assignment.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value='students' className='space-y-6'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>Students</CardTitle>
                  <Badge>{students?.length ?? 0}</Badge>
                </CardHeader>
                <CardContent>
                  {students && students.length > 0 ? (
                    students.map((s) => (
                      <div key={s.userId} className='flex items-center justify-between p-2'>
                        <div className='flex items-center gap-3'>
                          <Avatar>
                            <AvatarImage src={s.avatar || '/placeholder.svg'} alt={`${s.first_name} ${s.last_name}`} />
                            <AvatarFallback>{(s.first_name?.[0] ?? '') + (s.last_name?.[0] ?? '')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className='font-medium'>
                              {s.first_name} {s.last_name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-muted-foreground'>No students found.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value='grades' className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Grades</CardTitle>
                  <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='rounded-md border'>
                    <table className='w-full'>
                      <thead>
                        <tr className='border-b bg-muted/50'>
                          <th className='p-3 text-left font-medium'>Assignment</th>
                          <th className='p-3 text-left font-medium'>Due Date</th>
                          <th className='p-3 text-left font-medium'>Points</th>
                          <th className='p-3 text-left font-medium'>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.map((assignment) => (
                          <tr key={assignment.id} className='border-b'>
                            <td className='p-3'>{assignment.title}</td>
                            <td className='p-3'>{assignment.dueDate}</td>
                            <td className='p-3'>{assignment.points}</td>
                            <td className='p-3'>
                              <Badge variant={assignment.status === 'Assigned' ? 'outline' : 'default'}>{assignment.status}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Sidebar - only show on stream and classwork tabs */}
          {(activeTab === 'stream' || activeTab === 'classwork') && (
            <div className='md:col-span-1'>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {assignments.slice(0, 3).map((assignment) => (
                      <div key={assignment.id} className='flex flex-col gap-1 border-b pb-3 last:border-0'>
                        <h4 className='font-medium'>{assignment.title}</h4>
                        <p className='text-sm text-muted-foreground'>Due {assignment.dueDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant='ghost' size='sm' className='w-full'>
                    View all
                  </Button>
                </CardFooter>
              </Card>

              <Card className='mt-6'>
                <CardHeader>
                  <CardTitle>Class Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      <BookOpen className='h-4 w-4 text-muted-foreground' />
                      <span>{name}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Calendar className='h-4 w-4 text-muted-foreground' />
                      <span>{schedule || 'MWF 10:00 AM'}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Users className='h-4 w-4 text-muted-foreground' />
                      <span>? students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default AppSubjectPage;
