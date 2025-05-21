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
import getTeacher from '@/lib/actions/getTeacher';
import SidebarContentStudent from './SidebarContentStudent';
import SidebarContentTeacher from './SidebarContentTeacher';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
];
const SidebarContent1 = async () => {
  const { user } = await getLoggedInUser();

  if (!user?.id) return <>You are not login</>;
  const { documents: student } = await getStudent(user?.id);

  if (student.length <= 0) {
    const { documents: teacher } = await getTeacher(user?.id);
    console.log('🚀 ~ SidebarContent1 ~ teacher:', teacher?.[0].subjects?.[0]);
    return (
      <SidebarContent>
        <SidebarGroup>
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
                <SidebarContentTeacher teacher={teacher} />
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={'/subjects/create'}>
                        <Plus></Plus>
                        Add subject
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
  }

  return (
    <SidebarContent>
      <SidebarGroup>
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
              <BookOpen className='mr-2' /> Class
              <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <SidebarContentStudent student={student} />
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/subjects/join'}>
                      <Plus></Plus>
                      Join subjects
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
