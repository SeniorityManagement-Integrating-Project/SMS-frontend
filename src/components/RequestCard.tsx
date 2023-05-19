import React from 'react';
import { formatDate } from '@/utils/date';
import { RequestStatusBadge } from '@components/RequestStatusBadge';

interface Props {
  createdAt: string;
  updatedAt: string;
  id: number;
  approved: boolean;
  validated: boolean;
}

export const RequestCard = ({ id, createdAt, updatedAt, approved, validated }: Props) => {
  return (
    <article className='my-2 flex text-sm'>
      <div className='grow font-bold'>
        <p>
          request id: <span className='font-light'>{id}</span>{' '}
        </p>
        <p>
          request date: <span className='font-light'>{formatDate(createdAt)}</span>
        </p>
        {validated && (
          <p>
            validation date: <span className='font-light'>{formatDate(updatedAt)}</span>
          </p>
        )}
      </div>
      <RequestStatusBadge approved={approved} validated={validated} className='flex-row-reverse' />
    </article>
  );
};
