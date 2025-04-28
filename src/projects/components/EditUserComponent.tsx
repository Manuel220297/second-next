'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const UserPage = () => {
  const [name, setName] = useState('Anonymous');
  const [email, setEmail] = useState('Anonymous@4chn.cdn');
  const [phone, setPhone] = useState('123-456-789');
  const [location, setLocation] = useState('Dox, 123st Sneed');
  const [role, setRole] = useState('Janitor');

  return (
    <div className='bg-primary-foreground p-4 rounded-lg relative'>
      <Button onClick={() => setName('Ackkk')} className='bg-primary p-4 rounded-md absolute right-5'>
        Edit User
      </Button>
      User Info
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Phone: {phone}</div>
      <div>Location: {location}</div>
      <div>Role : {role}</div>
    </div>
  );
};

export default UserPage;
