import { Sidebar } from '@/components/ui/sidebar';

import SidebarContentFooter from './sidebar/SidebarContentFooter';
import SidebarContentHeader from './sidebar/SidebarContentHeader';
import SidebarContent1 from './sidebar/SidebarContent1';

// Menu items.

const AppSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContentHeader></SidebarContentHeader>
      <hr />
      <SidebarContent1 />
      <SidebarContentFooter />
    </Sidebar>
  );
};

export default AppSidebar;
