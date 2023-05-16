import { Loader } from '@/components/Loader';
import { SkillRequestAdminCard } from '@components/SkillRequestAdminCard';
import { useFetch } from '@/hooks/useFetch';
import React from 'react';

const Requests = () => {
  const { data, loading, error, reload } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/request/pending/`);

  let content;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <p className='py-5 text-center'>Something went wrong, try again</p>;
  } else if (data.length === 0) {
    content = <p className='py-5 text-center'>No requests found</p>;
  } else {
    content = (
      <>
        {data
          .sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1))
          .map((request: any) => (
            <SkillRequestAdminCard
              key={request.id}
              requestID={request.id}
              requestedAt={request.created_at}
              employee={request.employee}
              skill={request.skill}
              comments={request.comments}
              supportFile={request.support_file}
              reload={reload}
            />
          ))}
      </>
    );
  }

  return (
    <div>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Pending Requests</h1>
      <div className='flex flex-wrap justify-center'>{content}</div>
    </div>
  );
};

export default Requests;
