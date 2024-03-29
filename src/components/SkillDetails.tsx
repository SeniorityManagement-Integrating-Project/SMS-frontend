import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import React from 'react';
import { Loader } from '@/components/Loader';
import { RequestCard } from '@/components/RequestCard';

interface Props {
  skillId: number;
  employeeId: number;
}

export const SkillDetails = ({ employeeId, skillId }: Props) => {
  const router = useRouter();
  const { data, loading }: { data: any; loading: boolean } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/skill/employee_request/${skillId}/${employeeId}`,
    router.isReady
  );
  return loading ? (
    <Loader />
  ) : (
    <article>
      <div className='pb-2 mb-4 border-b border-gray-500'>
        <h1 className='text-xl font-bold'>{data.name}</h1>
        <p className='text-xs text-gray-300'>{data.description}</p>
      </div>
      <h2 className='font-bold text-md'>Requests:</h2>
      {data.employee_requests.length > 0 ? (
        <ul>
          {data.employee_requests.map((request: any) => (
            <li key={request.id}>
              <RequestCard
                id={request.id}
                createdAt={request.created_at}
                updatedAt={request.updated_at}
                approved={request.approved}
                validated={request.validated}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no requests for this skill</p>
      )}
    </article>
  );
};
