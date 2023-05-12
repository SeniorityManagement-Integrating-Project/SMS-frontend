import React, { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  text: string;
  handleDelete?: () => void;
}
export const BasicCard = ({ title, text, handleDelete = undefined }: Props) => (
  <div className='relative p-4 bg-white border-2 rounded-md shadow-md border-b-rose-600 w-60'>
    <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
    <p className='text-gray-500'>{text}</p>
    {handleDelete && (
      <button type='button' onClick={handleDelete} className='absolute w-6 h-6 bg-red-500 rounded-full top-1 right-1'>
        ×
      </button>
    )}
  </div>
);
