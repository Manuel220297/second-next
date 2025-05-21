'use client';

import { useState, useTransition } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner'; // optional for success/failure feedback

export interface AddStudent {
  $id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface AppAddStudentProps {
  documentId: string;
  students: AddStudent[];
}

const AppAddStudent = ({ documentId, students }: AppAddStudentProps) => {
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (students: string) => {
    setSelected(students);
    startTransition(async () => {
      try {
        const res = await fetch('/api/add_student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ documentId, students }),
        });

        const data = await res.json();
        if (data.success) {
          toast.success('Student added successfully');
        } else {
          toast.error(`Failed to add student: ${data.error}`);
        }
      } catch (err) {
        toast.error('An error occurred while adding student');
        console.error(err);
      } finally {
        setSelected(null);
      }
    });
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Students</CardTitle>
      </CardHeader>
      <CardContent>
        {students && students.length > 0 ? (
          students.map((s) => (
            <button key={s.$id} onClick={() => handleClick(s.$id)} className={`flex w-full items-center justify-between p-2 hover:bg-muted rounded-md ${selected === s.$id ? 'opacity-50' : ''}`} disabled={isPending && selected === s.$id}>
              <div className='flex items-center gap-3 text-left'>
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
            </button>
          ))
        ) : (
          <p className='text-muted-foreground'>No students found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AppAddStudent;
