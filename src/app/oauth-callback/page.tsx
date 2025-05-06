'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthPage() {
  const router = useRouter();

  useEffect(() => {
    const finalizeLogin = async () => {
      const url = new URL(window.location.href);
      const userId = url.searchParams.get('userId');
      const secret = url.searchParams.get('secret');
      console.log('userID:', userId);
      console.log('Secret:', secret);

      const res = await fetch('/api/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, secret }),
      });
      if (res.ok) {
        router.replace('/');
      } else {
        router.replace('/signup');
      }
    };
    finalizeLogin();
  }, []);

  return <p>Signing in with Google...</p>;
}
