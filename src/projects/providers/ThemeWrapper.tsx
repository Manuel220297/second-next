'use client';

import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(
  async () => {
    const mod = await import('./ThemeProvider');
    return mod.ThemeProvider;
  },
  { ssr: false }
);

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
        <div>{children}</div>
      </ThemeProvider>
    </>
  );
}
