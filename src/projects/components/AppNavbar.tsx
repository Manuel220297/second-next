'use server';
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Bell, LogOut, Moon, Settings2, SquareMenu, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ModeToggle from './ModeToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import getUsername from '@/lib/actions/getUsername';
import { cookies } from 'next/headers';
import { createAdminClient, getLoggedInUser } from '@/lib/server/appwrite';
import { Badge } from '@/components/ui/badge';
import { FaUserShield } from 'react-icons/fa6';

const getName = async () => {
  const session = await cookies();
  const cookieSession = await session.get('myproject-session');
  if (!cookieSession) {
    return 'No session';
  }
  const username = getUsername(cookieSession?.value);
  return username;
};

const AppNavbar = async () => {
  const { user } = await getLoggedInUser();
  const containsSuper = user?.label.includes('superuser');

  const username = await getName();
  return (
    <nav className='p-4 flex items-center  justify-between'>
      <SidebarTrigger></SidebarTrigger>
      <div className='flex items-center gap-4'>
        <Badge>
          <FaUserShield />
          Admin
        </Badge>
        <Link href={'/'} className='hidden md:inline'>
          Hello {username}
        </Link>
        <ModeToggle></ModeToggle>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='p-2'>
            <DropdownMenuLabel className='p-2'>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='p-2' asChild>
              <Link href={`/${user?.id}`}>
                <User /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='p-2'>
              <Settings2></Settings2> Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className='p-2' variant='destructive' asChild>
              <Link href={'/logout'}>
                <LogOut></LogOut>Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>
              <Bell></Bell>
              <span className='sr-only'>Open Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Example Notification 1</DropdownMenuItem>
            <DropdownMenuItem>Example Notification 2</DropdownMenuItem>
            <DropdownMenuItem>Example Notification 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AppNavbar;
