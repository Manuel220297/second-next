import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import getGrades, { Grade } from '@/lib/actions/getGrades';
import { getLoggedInUser } from '@/lib/server/appwrite';

export default async function GradesTable() {
  const { user } = await getLoggedInUser();
  const { documents: grades } = await getGrades(user?.id!);
  // const grades: Grade[] = [
  //   {
  //     id: 1,
  //     subject: 'Mathematics',
  //     prelim: 100,
  //     midterm: 100,
  //     prefinal: 100,
  //     final: 100,
  //     grade: 'A',
  //   },
  // ] as any;
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Prelim</TableHead>
            <TableHead>Midterm</TableHead>
            <TableHead>Prefinal</TableHead>
            <TableHead>Final</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades.map((grade, gradeIndex) => (
            <TableRow key={gradeIndex}>
              <TableCell className='font-medium'>{grade.subjects.name}</TableCell>
              <TableCell>{grade.prelim}</TableCell>
              <TableCell>{grade.midterm}</TableCell>
              <TableCell>{grade.prefinal}</TableCell>
              <TableCell>{grade.final}</TableCell>
              <TableCell>
                <Badge variant={'default'} className='ml-auto'>
                  {grade.grade}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
