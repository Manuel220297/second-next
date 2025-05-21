import getStudentLists from '@/lib/actions/getStudentLists';
import TransactionForm from '@/projects/components/transaction-form';
import React from 'react';

const AdminPage = async () => {
  const students = await getStudentLists();

  return (
    <div className='container mx-auto py-10'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Create New Transaction</h1>
        <div className='bg-card p-6 rounded-lg shadow'>
          <TransactionForm students={students} />
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
