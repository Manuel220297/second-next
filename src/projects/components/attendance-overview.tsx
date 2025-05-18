import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface AttendanceData {
  id: number;
  className: string;
  grade: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

export default function AttendanceOverviewT() {
  // Mock data for attendance
  const attendanceData: AttendanceData[] = [
    {
      id: 1,
      className: 'English Literature',
      grade: '9th Grade',
      present: 24,
      absent: 1,
      late: 1,
      total: 26,
    },
    {
      id: 2,
      className: 'English Literature',
      grade: '10th Grade',
      present: 22,
      absent: 2,
      late: 0,
      total: 24,
    },
    {
      id: 3,
      className: 'English Literature',
      grade: '11th Grade',
      present: 20,
      absent: 0,
      late: 2,
      total: 22,
    },
    {
      id: 4,
      className: 'Creative Writing',
      grade: '12th Grade',
      present: 17,
      absent: 1,
      late: 0,
      total: 18,
    },
  ];

  return (
    <div className='space-y-4'>
      {attendanceData.map((item) => (
        <div key={item.id} className='rounded-lg border p-3'>
          <div className='mb-2 font-medium'>
            {item.className} - {item.grade}
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-1 text-sm'>
              <CheckCircle2 className='h-4 w-4 text-success' />
              <span>
                {item.present} <span className='text-muted-foreground'>({Math.round((item.present / item.total) * 100)}%)</span>
              </span>
            </div>
            <div className='flex items-center gap-1 text-sm'>
              <Clock className='h-4 w-4 text-warning' />
              <span>
                {item.late} <span className='text-muted-foreground'>({Math.round((item.late / item.total) * 100)}%)</span>
              </span>
            </div>
            <div className='flex items-center gap-1 text-sm'>
              <XCircle className='h-4 w-4 text-destructive' />
              <span>
                {item.absent} <span className='text-muted-foreground'>({Math.round((item.absent / item.total) * 100)}%)</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
