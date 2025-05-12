import CardList from '@/projects/components/CardList';
import { DataTable } from './data-table';
import { columns } from './columns';
import users from '@/data/users.json';
import getStudent from '@/lib/actions/getStudent';
import getStudentLists from '@/lib/actions/getStudentLists';

// const getUsers = async (): Promise<Users[]> => {
//   return users;
// };
const UsersPage = async () => {
  // json fake users
  // const jsonUsers = await getUsers();

  // database users
  const user = await getStudentLists();
  // console.log('These are users,', user);

  return (
    <div className='mx-4'>
      <div className='mb-8 px-4 py-2 bg-secondary rounded-md'>
        <h1 className='font-semibold'>All Users</h1>
      </div>
      <DataTable columns={columns} data={user}></DataTable>
    </div>
  );
};

export default UsersPage;
