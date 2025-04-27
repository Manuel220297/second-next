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

import { LogOut, Moon, Settings2, SquareMenu, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ModeToggle from './ModeToggle';

type Props = {};

const AppNavbar = ({}: Props) => {
  return (
    <nav className='p-4 flex items-center  justify-between'>
      collapsebutton
      <div className='flex items-center gap-4'>
        <Link href={'/'}>Dashboard</Link>
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
            <DropdownMenuItem className='p-2'>
              <User></User> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className='p-2'>
              <Settings2></Settings2> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className='p-2' variant='destructive'>
              <LogOut></LogOut>Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>
              <SquareMenu></SquareMenu>
              <span className='sr-only'>Open Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Menu 1</DropdownMenuItem>
            <DropdownMenuItem>Menu 2</DropdownMenuItem>
            <DropdownMenuItem>Menu 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AppNavbar;
