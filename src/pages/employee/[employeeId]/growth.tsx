import { useRouter } from 'next/router';
import { SeniorityLevelCard } from '@/components/SeniorityLevelCard';
import { Loader } from '@/components/Loader';
import { useFetch } from '@/hooks/useFetch';

const Growth = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const { data, loading, error } = useFetch<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/employee/growth/${employeeId}`,
    router.isReady
  );

  let content;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <p className='py-5 text-center'>Something went wrong, try again</p>;
  } else if (data.length === 0) {
    content = <p className='py-5 text-center'>No growth path found</p>;
  } else {
    content = (
      <>
        {data.map((level: any) => (
          <SeniorityLevelCard
            key={level.level}
            name={level.level_name}
            description={level.description}
            level={level.level}
            completed={level.skills.filter((skill: any) => !skill.is_attained).length === 0 && level.skills.length > 0}
            skills={level.skills}
          />
        ))}
      </>
    );
  }

  return (
    <main>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Growth path</h1>
      {content}
    </main>
  );
};

export default Growth;
