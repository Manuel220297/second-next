import React from 'react';

import { BeatLoader } from 'react-spinners';

const loading = () => {
  return (
    <div className='flex flex-col justify-center align-middle items-center h-[85vh]'>
      <p className='text-[#4dbbff] text-5xl font-black mb-6'>Loading</p>
      <BeatLoader color='#4dbbff' cssOverride={{}} loading margin={8} size={32} speedMultiplier={1.5} className='' />
    </div>
  );
};

export default loading;
