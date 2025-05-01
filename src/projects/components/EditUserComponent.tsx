'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SheetDemo } from './SheetDemo';
import { SheetDemoCopy } from './SheetDemoCopy';
import { toast } from 'sonner';

type Props = {
  user?: {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    role?: string;
  };
};

const EditUserComponent = ({ user }: Props) => {
  const [form, setForm] = useState({
    name: user?.name || 'Anonymous',
    email: user?.email || 'Anonymous@4chn.cdn',
    phone: user?.phone || '123-456-789',
    location: user?.location || 'Dox, 123st Sneed',
    role: user?.role || 'Janitor',
  });

  const handleFormSubmit = (data: typeof form) => {
    setForm(data);
  };

  // 2 Passes the data to sheet demo
  return (
    <div className='bg-primary-foreground p-4 rounded-lg relative'>
      <SheetDemo className='absolute right-3' defaultValues={form} onSubmit={handleFormSubmit} />
      <SheetDemoCopy className='absolute right-32' defaultValues={form} onSubmit={handleFormSubmit} />
      User Info
      <div className='flex flex-col gap-4 font-light '>
        <div>
          <span className='text-base text-primary font-medium'>Name:</span> {form.name}
        </div>
        <div>
          <span className='text-base text-primary font-medium'>Email:</span> {form.email}
        </div>
        <div>
          <span className='text-base text-primary font-medium'>Phone:</span> {form.phone}
        </div>
        <div>
          <span className='text-base text-primary font-medium'>Location:</span> {form.location}
        </div>
        <div>
          <span className='text-base text-primary font-medium'>Role:</span> {form.role}
        </div>
      </div>
    </div>
  );
};

export default EditUserComponent;
