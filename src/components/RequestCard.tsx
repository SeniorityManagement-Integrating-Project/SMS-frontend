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

export const RequestCard = ({ id, createdAt, updatedAt, approved, validated }: Props) => (
  <article className='flex my-2 text-sm'>
    <div className='font-bold grow'>
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
