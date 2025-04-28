'use client';

import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  label?: string;
  description?: string;
};

export function CheckboxWithText({ label, description }: Props) {
  return (
    <div className='items-center flex space-x-2'>
      <Checkbox id='terms1' />
      <div className='grid gap-1.5 leading-none'>
        <main className='text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{label || 'Accept terms and conditions'}</main>
        <p className='text-xs text-muted-foreground'>{description || 'You agree to our Terms of Service and Privacy Policy.'}</p>
      </div>
    </div>
  );
}
