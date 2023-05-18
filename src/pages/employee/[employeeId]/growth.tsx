import { useRouter } from 'next/router';
import { SeniorityLevelEmployeeCard } from '@/components/SeniorityLevelEmployeeCard';
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
    const firstNotAchivedLevel = data
      .sort((a: any, b: any) => a.level - b.level)
      .find((level: any) => level.skills.some((skill: any) => !skill.is_attained)).level;
    content = (
      <>
        {data.map((level: any) => (
          <SeniorityLevelEmployeeCard
            key={level.level}
            name={level.level_name}
            description={level.description}
            level={level.level}
            completed={level.level < firstNotAchivedLevel}
            skills={level.skills}
          />
        ))}
      </>
    );
  }

  return (
    <main>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-primary'>Growth path</h1>
      {content}
    </main>
  );
};

export default Growth;
