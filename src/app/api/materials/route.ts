// app/api/materials/route.ts
import { NextResponse } from 'next/server';
import getLearningMaterialsLists from '@/lib/actions/getLearningMaterialsLists';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId');

  const materials = await getLearningMaterialsLists();
  const filtered = materials.filter((m) => m.subjects?.id === subjectId);

  return NextResponse.json(filtered);
}
