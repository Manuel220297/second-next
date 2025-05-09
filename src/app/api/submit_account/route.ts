import { NextResponse } from 'next/server';
import { createStudentAccount } from '@/lib/actions/createStudentAccount';
import { createTeacherAccount } from '@/lib/actions/createTeacherAccount';

export async function POST(req: Request) {
  const data = await req.json();

  const { userType } = data;

  if (userType == 'teacher') {
    const result = await createTeacherAccount(data);

    return NextResponse.json(result);
  } else {
    const result = await createStudentAccount(data);

    return NextResponse.json(result);
  }
}
