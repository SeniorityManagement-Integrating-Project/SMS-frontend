import React, { ReactNode } from 'react';
import { Tooltip } from '@mui/material';
import { TbX } from 'react-icons/tb';

interface Props {
  title: ReactNode;
  text: string;
  handleDelete?: () => void;
  className?: string;
}

export const BasicCard = ({ title, text, className, handleDelete = undefined }: Props) => (
  <div className={`group relative p-6 mb-6 rounded-lg bg-background-2 text-white w-full ${className}`}>
    <h3 className='text-lg font-medium'>{title}</h3>
    <p className='text-gray-300'>{text}</p>
    {handleDelete && (
      <Tooltip title='Delete' arrow placement='top'>
        <button
          type='button'
          onClick={handleDelete}
          className='absolute place-items-center w-6 h-6 rounded-full top-3 right-3 z-50 bg-red-500 group-hover:grid hidden'
        >
          <TbX />
        </button>
      </Tooltip>
    )}
  </div>
);
