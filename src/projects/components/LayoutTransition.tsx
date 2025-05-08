// components/LayoutTransition.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LayoutTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const basePath = pathname.split('/').slice(0, 2).join('/');

  return (
    <motion.div key={basePath} initial={{ opacity: 0.1, scale: 0.975 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.975 }} transition={{ duration: 1.33 }}>
      {children}
    </motion.div>
  );
}
