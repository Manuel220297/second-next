'use client';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export function AutoBreadcrumb({ className }: Props) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb className={cn('flex align-middle items-center text-sidebar-foreground/63 font-semibold text-sm', className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href='/'>Home</Link>
        </BreadcrumbItem>

        {paths.map((path, index) => {
          const href = '/' + paths.slice(0, index + 1).join('/');
          const isLast = index === paths.length - 1;

          return (
            <BreadcrumbItem key={href}>
              <ChevronRight size={16} strokeWidth={2} />
              {isLast ? (
                <span className='text-primary'>{path.charAt(0).toUpperCase() + path.slice(1)}</span>
              ) : (
                <>
                  <Link href={href}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
