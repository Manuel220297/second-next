import { Progress } from '@/components/ui/progress';

interface ClassPerformanceData {
  id: number;
  className: string;
  grade: string;
  averageScore: number;
  submissionRate: number;
  studentsCount: number;
}

export default function ClassPerformanceT() {
  // Mock data for class performance
  const classData: ClassPerformanceData[] = [
    // {
    //   id: 1,
    //   className: 'English Literature',
    //   grade: '9th Grade',
    //   averageScore: 82,
    //   submissionRate: 94,
    //   studentsCount: 26,
    // },
    // {
    //   id: 2,
    //   className: 'English Literature',
    //   grade: '10th Grade',
    //   averageScore: 78,
    //   submissionRate: 88,
    //   studentsCount: 24,
    // },
    // {
    //   id: 3,
    //   className: 'English Literature',
    //   grade: '11th Grade',
    //   averageScore: 85,
    //   submissionRate: 92,
    //   studentsCount: 22,
    // },
    // {
    //   id: 4,
    //   className: 'Creative Writing',
    //   grade: '12th Grade',
    //   averageScore: 91,
    //   submissionRate: 97,
    //   studentsCount: 18,
    // },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-success';
    if (score >= 80) return 'bg-primary';
    if (score >= 70) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className='space-y-4'>
      {classData.map((classItem) => (
        <div key={classItem.id} className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='font-medium'>
                {classItem.className} - {classItem.grade}
              </div>
              <div className='text-xs text-muted-foreground'>
                {classItem.studentsCount} students • {classItem.submissionRate}% submission rate
              </div>
            </div>
            <div className='text-sm font-medium'>{classItem.averageScore}%</div>
          </div>
          <Progress value={classItem.averageScore} className={getScoreColor(classItem.averageScore)} />
        </div>
      ))}
    </div>
  );
}
