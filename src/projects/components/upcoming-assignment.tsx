import { CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
}

export default function UpcomingAssignments() {
  // Mock data for upcoming assignments
  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Research Paper',
      subject: 'English Literature',
      dueDate: 'Apr 10, 2025',
      daysLeft: 2,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Problem Set 5',
      subject: 'Mathematics',
      dueDate: 'Apr 12, 2025',
      daysLeft: 4,
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Lab Report',
      subject: 'Physics',
      dueDate: 'Apr 15, 2025',
      daysLeft: 7,
      priority: 'medium',
    },
    {
      id: 4,
      title: 'Group Project',
      subject: 'Computer Science',
      dueDate: 'Apr 20, 2025',
      daysLeft: 12,
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string, daysLeft: number) => {
    if (priority === 'high' || daysLeft <= 2) return 'destructive';
    if (priority === 'medium' || daysLeft <= 5) return 'warning';
    return 'secondary';
  };

  return (
    <div className='space-y-4'>
      {assignments.map((assignment) => (
        <div key={assignment.id} className='flex flex-col gap-1 rounded-lg border p-3 text-sm'>
          <div className='flex items-center justify-between'>
            <div className='font-medium'>{assignment.title}</div>
            <Badge variant={getPriorityColor(assignment.priority, assignment.daysLeft) as 'default' | 'secondary' | 'destructive' | 'outline'}>
              {assignment.daysLeft} {assignment.daysLeft === 1 ? 'day' : 'days'} left
            </Badge>
          </div>
          <div className='flex items-center justify-between text-xs'>
            <div className='text-muted-foreground'>{assignment.subject}</div>
            <div className='flex items-center text-muted-foreground'>
              <CalendarDays className='mr-1 h-3 w-3' />
              <span>Due {assignment.dueDate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
