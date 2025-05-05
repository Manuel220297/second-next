import CardList from '@/projects/components/CardList';
import EditUserComponent from '@/projects/components/EditUserComponent';
import users from '@/data/users.json';

const UserPage = ({ params }: { params: { id: string } }) => {
  let userId = parseInt(params.id);
  let userData = users.find((u) => u.id === userId);
  return (
    <div className='mx-4'>
      <div className='grid gap-4 '>
        <EditUserComponent user={userData}></EditUserComponent>
      </div>
    </div>
  );
};

export default UserPage;
