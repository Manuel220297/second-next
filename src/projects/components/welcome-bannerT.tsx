// import { Bell, MessageSquare, Plus } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';

// export default function WelcomeBannerT() {
//   const teacherName = 'Ms. Rebecca Davis';
//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className='space-y-4'>
//       <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
//         <div>
//           <h1 className='text-2xl font-bold tracking-tight'>Welcome, {teacherName}!</h1>
//           <p className='text-muted-foreground'>{currentDate}</p>
//         </div>
//         <div className='flex items-center gap-2'>
//           <Button variant='outline' size='sm' className='h-8 gap-1'>
//             <MessageSquare className='h-3.5 w-3.5' />
//             <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Messages</span>
//           </Button>
//           <Button variant='outline' size='sm' className='h-8 gap-1'>
//             <Bell className='h-3.5 w-3.5' />
//             <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Notifications</span>
//           </Button>
//           <Button size='sm' className='h-8 gap-1'>
//             <Plus className='h-3.5 w-3.5' />
//             <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>New Task</span>
//           </Button>
//         </div>
//       </div>

//       <Alert className='bg-primary/10 border-primary/20'>
//         <AlertTitle className='text-primary'>Faculty Meeting</AlertTitle>
//         <AlertDescription>Reminder: Faculty meeting today at 3:30 PM in the conference room. Spring curriculum changes will be discussed.</AlertDescription>
//       </Alert>
//     </div>
//   );
// }
