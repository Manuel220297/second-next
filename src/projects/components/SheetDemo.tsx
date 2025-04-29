import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// formscehma with zod with rror

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  className?: string;
  defaultValues: FormSchema;
  onSubmit: (data: FormSchema) => void;
};

export function SheetDemo({ className, defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline'>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
            </SheetHeader>
            <div className='grid gap-4 py-4'>
              {/* NAME */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' {...register('name')} className='col-span-3' />
                {errors.name && <p className='text-red-500 text-xs col-span-4 text-right'>{errors.name.message}</p>}
              </div>

              {/* EMAIL */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className='text-right'>
                  Email
                </Label>
                <Input id='email' {...register('email')} className='col-span-3' />
                {errors.email && <p className='text-red-500 text-xs col-span-4 text-right'>{errors.email.message}</p>}
              </div>

              {/* PHONE */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='phone' className='text-right'>
                  Phone
                </Label>
                <Input id='phone' {...register('phone')} className='col-span-3' />
                {errors.phone && <p className='text-red-500 text-xs col-span-4 text-right'>{errors.phone.message}</p>}
              </div>

              {/* LOCATION */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='location' className='text-right'>
                  Location
                </Label>
                <Input id='location' {...register('location')} className='col-span-3' />
                {errors.location && <p className='text-red-500 text-xs col-span-4 text-right'>{errors.location.message}</p>}
              </div>

              {/* ROLE */}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='role' className='text-right'>
                  Role
                </Label>
                <Input id='role' {...register('role')} className='col-span-3' />
                {errors.role && <p className='text-red-500 text-xs col-span-4 text-right'>{errors.role.message}</p>}
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Save changes</Button>
              </SheetClose>
              <Button type='button' variant='outline' onClick={() => reset(defaultValues)}>
                Reset to Default
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
