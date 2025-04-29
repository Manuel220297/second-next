'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SheetDemo } from './SheetDemo';

const EditUserComponent = () => {
  // 1 Default data
  const [form, setForm] = useState({
    name: 'Anonymous',
    email: 'Anonymous@4chn.cdn',
    phone: '123-456-789',
    location: 'Dox, 123st Sneed',
    role: 'Janitor',
  });

  const handleFormSubmit = (data: typeof form) => {
    setForm(data);
    console.log('Form updated!', data);
  };

  // 2 Passes the data to sheet demo
  return (
    <div className='bg-primary-foreground p-4 rounded-lg relative'>
      <SheetDemo className='absolute right-3' defaultValues={form} onSubmit={handleFormSubmit} />
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
