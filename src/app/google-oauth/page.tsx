// app/oauth/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finalizeLogin = async () => {
      const res = await fetch('/api/googlesuccess');
      if (res.ok) {
        router.replace('/dashboard');
      } else {
        router.replace('/signup');
      }
    };
    finalizeLogin();
  }, []);

  return <p>Signing in with Google...</p>;
}
