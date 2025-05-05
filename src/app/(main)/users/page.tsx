import CardList from '@/projects/components/CardList';
import { DataTable } from './data-table';
import { Users, columns } from './columns';
import users from '@/data/users.json';

const getUsers = async (): Promise<Users[]> => {
  return users;
};
const UsersPage = async () => {
  const users = await getUsers();

  return (
    <div className='mx-4'>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibold'>All Users</h1>
      </div>
      <DataTable columns={columns} data={users}></DataTable>
    </div>
  );
};

export default UsersPage;
