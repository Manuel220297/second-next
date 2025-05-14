'use client';

import CreatePost from '../CreatePost';
import MaterialsList from './MaterialList';
import { useLearningMaterials } from '@/lib/hooks/useLearningMaterials';

type Props = {
  userId: string;
  subjectId: string;
  canPost: boolean;
};

export default function LearnMaterialsClient({ userId, subjectId, canPost }: Props) {
  const { materials, isLoading, mutate } = useLearningMaterials(subjectId);

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-6'>Materials</h1>

      {isLoading ? 'Loading...' : <MaterialsList materials={materials} />}

      {canPost && <CreatePost authorId={userId} subjectId={subjectId} onPostSuccess={() => mutate()} />}
    </div>
  );
}
