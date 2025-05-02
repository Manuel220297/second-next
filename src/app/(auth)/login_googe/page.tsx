'use client';

import { Button } from '@/components/ui/button';
import { account, loginWithGoogle } from '@/lib/client/appwrite';
import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import SignUpPage from '../login-node-google/page';

const checkSession = async () => {
  try {
    const user = await account.get();
    console.log('User is logged in:', user);
    return user;
  } catch (error) {
    console.log('No active session');
    return null;
  }
};

const TestGoogle = () => {
  return (
    <div>
      <Button onClick={loginWithGoogle} variant='outline' className='w-full'>
        <FaGoogle />
        Login with Google
      </Button>
      <Button onClick={checkSession} variant='outline' className='w-full'>
        <FaGoogle />
        checkSession
      </Button>
      Tests
    </div>
  );
};

export default TestGoogle;
