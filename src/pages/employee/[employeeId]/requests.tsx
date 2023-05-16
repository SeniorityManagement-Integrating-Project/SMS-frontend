import { Loader } from '@/components/Loader';
import { SkillRequestCard } from '@/components/SkillRequestCard';
import { useFetch } from '@/hooks/useFetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Requests = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const { data, loading, error } = useFetch<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/request/employee/${employeeId}`,
    router.isReady
  );

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
            <SkillRequestCard
              key={request.id}
              approved={request.approved}
              validated={request.validated}
              requestedAt={request.created_at}
              validatedAt={request.updated_at}
              skillName={request.skill.name}
              skillDescription={request.skill.description}
              comments={request.comments}
              supportFile={request.support_file}
            />
          ))}
      </>
    );
  }

  return (
    <div>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Skill validation requests</h1>
      {content}
      <p className='mx-auto text-center'>
        Are you looking to validate a skill? go to the{' '}
        <Link className='underline text-rose-500' href={`/employee/${employeeId}/growth`}>
          growth section
        </Link>
      </p>
    </div>
  );
};

export default Requests;
