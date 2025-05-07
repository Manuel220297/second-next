import { Book, BookA, BookOpen, Calendar, ChevronDown, ChevronUp, Home, HomeIcon, HouseWifi, Inbox, Plus, Projector, Search, Settings, User2 } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getLoggedInUser } from '@/lib/server/appwrite';
import getStudent from '@/lib/actions/getStudent';
import { Grade } from '@/lib/actions/getGrades';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];
const SidebarContent1 = async () => {
  const { user } = await getLoggedInUser();

  if (!user?.id) return <>You are not login</>;
  const { documents: student } = await getStudent(user?.id);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={'/'}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.title == 'Inbox' && <SidebarMenuBadge>24</SidebarMenuBadge>}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <hr />
      <Collapsible defaultOpen className='group/collapsible'>
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className='dark:hover:bg-white/8 hover:bg-black/3  cursor-pointer'>
              <BookOpen className='mr-2' /> Subjects
              <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  {student[0].grades?.map((grade: Grade, gradesIndex: React.Key | null | undefined) => {
                    function formatTime(timeString: string | null): string {
                      if (!timeString) return '';
                      const [hours, minutes] = timeString.split(':');
                      const date = new Date();
                      date.setHours(parseInt(hours));
                      date.setMinutes(parseInt(minutes));
                      return date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      });
                    }

                    const formattedScheduleStart = formatTime(grade.subjects!.scheduleStart);
                    const formattedScheduleEnd = formatTime(grade.subjects!.scheduleEnd);
                    const schedule = `${formattedScheduleStart} - ${formattedScheduleEnd}`;
                    return (
                      <SidebarMenuButton className='overflow-visible' key={gradesIndex} asChild>
                        <Link className='my-4' href={`/subjects/${grade.subjects?.id}`}>
                          <div className='flex flex-col'>
                            <div>{grade.subjects?.name}</div>
                            <div className='text-primary/65 text-xs'>
                              {schedule} {grade.subjects?.scheduleDay ? grade.subjects.scheduleDay.charAt(0).toUpperCase() + grade.subjects.scheduleDay.slice(1) : ''}
                            </div>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    );
                  })}
                  {/* <SidebarMenuButton asChild>
     
                    <Link href={'/'}>See all projects</Link>
                  </SidebarMenuButton> */}
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/'}>
                      <Plus></Plus>
                      Add project
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarContent>
  );
};

export default SidebarContent1;
