import { CalendarDays, FileText, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Submission {
  id: number;
  studentName: string;
  assignment: string;
  subject: string;
  grade: string;
  submittedDate: string;
  status: 'pending' | 'reviewed' | 'late';
}

export default function RecentSubmissions() {
  // Mock data for recent submissions
  const submissions: Submission[] = [
    // {
    //   id: 1,
    //   studentName: 'Alex Johnson',
    //   assignment: 'Research Paper',
    //   subject: 'English Literature',
    //   grade: '11th Grade',
    //   submittedDate: 'Apr 8, 2025',
    //   status: 'pending',
    // },
    // {
    //   id: 2,
    //   studentName: 'Emma Williams',
    //   assignment: 'Essay Analysis',
    //   subject: 'English Literature',
    //   grade: '10th Grade',
    //   submittedDate: 'Apr 7, 2025',
    //   status: 'pending',
    // },
    // {
    //   id: 3,
    //   studentName: 'Michael Brown',
    //   assignment: 'Poetry Interpretation',
    //   subject: 'English Literature',
    //   grade: '9th Grade',
    //   submittedDate: 'Apr 7, 2025',
    //   status: 'pending',
    // },
    // {
    //   id: 4,
    //   studentName: 'Sophia Garcia',
    //   assignment: 'Short Story',
    //   subject: 'Creative Writing',
    //   grade: '12th Grade',
    //   submittedDate: 'Apr 6, 2025',
    //   status: 'reviewed',
    // },
    // {
    //   id: 5,
    //   studentName: 'James Wilson',
    //   assignment: 'Research Paper',
    //   subject: 'English Literature',
    //   grade: '11th Grade',
    //   submittedDate: 'Apr 5, 2025',
    //   status: 'late',
    // },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant='secondary'>Pending Review</Badge>;
      case 'reviewed':
        return <Badge variant='secondary'>Reviewed</Badge>;
      case 'late':
        return <Badge variant='secondary'>Late Submission</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Assignment</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <span className='font-medium'>{submission.studentName}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <FileText className='h-4 w-4 text-muted-foreground' />
                  <span>{submission.assignment}</span>
                </div>
              </TableCell>
              <TableCell>
                {submission.subject}
                <div className='text-xs text-muted-foreground'>{submission.grade}</div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-1'>
                  <CalendarDays className='h-3.5 w-3.5 text-muted-foreground' />
                  <span>{submission.submittedDate}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(submission.status)}</TableCell>
              <TableCell className='text-right'>
                <Button size='sm' variant={submission.status === 'reviewed' ? 'outline' : 'default'}>
                  {submission.status === 'reviewed' ? 'View' : 'Grade'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
