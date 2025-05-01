'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default LogoutPage;
