import { AutoBreadcrumb } from '@/projects/components/AutoBreadcrumb';
import CardList from '@/projects/components/CardList';
import EditUserComponent from '@/projects/components/EditUserComponent';

const UserPage = () => {
  return (
    <div className='mx-4'>
      <AutoBreadcrumb className='hidden md:block' />
      <div className='grid grid-cols-2 gap-4 '>
        <div className='bg-primary-foreground p-4 rounded-lg'>
          <CardList title='Ack'></CardList>
        </div>
        <EditUserComponent></EditUserComponent>
      </div>
    </div>
  );
};

export default UserPage;
