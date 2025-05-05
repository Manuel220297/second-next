import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SidebarContentHeader = () => {
  return (
    <div>
      <SidebarHeader className='py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/'}>
                <Image className='invert dark:invert-0 mx-2' width={20} height={20} src={'/vercel.svg'} alt='nextLogo'></Image>

                <Image className='dark:invert' width={80} height={80} src={'/next.svg'} alt='nextLogo'></Image>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </div>
  );
};

export default SidebarContentHeader;
