import React from 'react';

import { BarLoader, BeatLoader } from 'react-spinners';

const loading = () => {
  return (
    <div className='flex flex-col justify-center align-middle items-center h-[85vh]'>
      <p className='text-[#4dbbff] text-5xl font-black mb-6 animate-bounce'>Loading</p>
      <BarLoader color='#00baff' height={4} speedMultiplier={1.2} width={500} />
    </div>
  );
};

export default loading;
