import React from 'react';
import { Loader } from '@/components/Loader';
import { SkillRequestAdminCard } from '@components/SkillRequestAdminCard';
import { useFetch } from '@/hooks/useFetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Masonry } from 'react-plock';
import { AboutPageTooltip } from '@components/AboutPageTooltip';

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
    const requests = data.sort((a: any, b: any) => (b.created_at > a.created_at ? -1 : 1));
    content = (
      <Masonry
        config={{
          columns: [1, 2, 3],
          media: [900, 1200, 1600],
          gap: [20, 20, 20],
        }}
        items={requests}
        render={(request: any, index) => (
          <SkillRequestAdminCard
            key={index}
            requestID={request.id}
            requestedAt={request.created_at}
            employee={request.employee}
            skill={request.skill}
            comments={request.comments}
            supportFile={request.support_file}
            reload={reload}
          />
        )}
      />
    );
  }

  return (
    <main className='p-4'>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Pending Requests</h1>
      {content}
      <AboutPageTooltip>
        <p className='text-sm'>
          Here you can see all the skill validation requests that have been submitted by employees. You can also approve
          or reject each request and leave a comment for the employee.
        </p>
      </AboutPageTooltip>
    </main>
  );
};

export default Requests;
