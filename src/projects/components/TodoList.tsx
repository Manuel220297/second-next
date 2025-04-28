import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckboxWithText } from './CheckboxWithText';

const TodoList = () => {
  return (
    <div>
      <h1 className='text-xl font-medium'>Calendar</h1>
      <ScrollArea className='h-[500px] max-w-[350px] mx-auto rounded-md px-2.5 mt-10'>
        <div className='flex flex-col gap-2'>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 1' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 2' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 3' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 4' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 5' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 6' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 7' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 8' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 9' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 10' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 11' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
          <label className='border p-2 rounded-md'>
            <CheckboxWithText label='Item 12' description='Meat 64, Snowball 64, Fish 32'></CheckboxWithText>
          </label>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
