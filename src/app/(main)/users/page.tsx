import { AutoBreadcrumb } from '@/projects/components/AutoBreadcrumb';
import CardList from '@/projects/components/CardList';

const UsersPage = () => {
  return (
    <div className='mx-4'>
      <AutoBreadcrumb className='hidden md:block' />
      <div className='grid grid-cols-2 grid-rows-2 gap-4'>
        <div className=''>
          <CardList title='Ack'></CardList>
        </div>
        <div className=''>Ack</div>
      </div>
    </div>
  );
};

export default UsersPage;
