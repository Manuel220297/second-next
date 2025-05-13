'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Material } from '@/lib/actions/createPost';
import Linkify from 'linkify-react';
import Link from 'next/link';

interface MaterialsListProps {
  materials: Material[];
}

export default function MaterialsList({ materials }: MaterialsListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = materials.filter((material) => material.title.toLowerCase().includes(searchQuery.toLowerCase()) || material.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className='space-y-6'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input placeholder='Search materials...' className='pl-10' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      {filteredMaterials.length === 0 ? (
        <div className='flex h-40 items-center justify-center rounded-md border border-dashed'>
          <p className='text-muted-foreground'>No materials found</p>
        </div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredMaterials.map((material) => (
            <Card key={material.material_id} className='overflow-hidden transition-all hover:shadow-md'>
              <CardHeader className='pb-3'>
                <CardTitle className=''>{material.title}</CardTitle>
              </CardHeader>
              <CardDescription className=''> {material.subjects?.id} </CardDescription>
              <CardContent className='pt-4'>
                <CardDescription className=''>
                  <Linkify
                    options={{
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: () => 'text-blue-950 dark:text-blue-50 hover:underline hover:dark:text-blue-300 hover:text-blue-600 transition',
                    }}>
                    {material.content}
                  </Linkify>
                </CardDescription>
                {material.pdfile && <Link href={`/subjects/${material.subjects?.id}/learn/pdf/?url=${encodeURIComponent(material.pdfile)}`}>Click here</Link>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
