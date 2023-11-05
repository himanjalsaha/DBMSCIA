import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className='flex justify-center'>
      <div className='h-1 bg-white w-full rounded-2xl'>
        <div className='h-1 bg-green-500 rounded-2xl' style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
