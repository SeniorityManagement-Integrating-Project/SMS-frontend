import React from 'react';
import { TbCircleCheck, TbForbid2 } from 'react-icons/tb';

interface Props {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  approved: boolean;
  validated: boolean;
}

export const RequestCard = ({ id, createdAt, updatedAt, approved, validated }: Props) => {
  const formattedRequestDate = new Date(createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const formattedValidationDate = new Date(updatedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <article className='my-2'>
      <p>request id: {id}</p>
      <p>request date: {formattedRequestDate}</p>
      <p className='flex items-center gap-2'>
        validated:{' '}
        {validated ? (
          <TbCircleCheck className='text-xl text-green-600' />
        ) : (
          <TbForbid2 className='text-xl text-red-600' />
        )}
      </p>
      {validated && (
        <p className='flex items-center gap-2'>
          approved:{' '}
          {approved ? (
            <TbCircleCheck className='text-xl text-green-600' />
          ) : (
            <TbForbid2 className='text-xl text-red-600' />
          )}
        </p>
      )}
      {validated && <p>validation date: {formattedValidationDate}</p>}
    </article>
  );
};
