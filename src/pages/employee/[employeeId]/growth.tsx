import { useRouter } from 'next/router';
import { SeniorityLevelCard } from '@/components/SeniorityLevelCard';
import { Loader } from '@/components/Loader';
import { useFetch } from '@/hooks/useFetch';

const Growth = () => {
  const router = useRouter();
  const { employeeId } = router.query;
  const { data: growthData, loading } = useFetch<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/employee/growth/${employeeId}`,
    router.isReady
  );
  return (
    <main>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Growth path</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {growthData.map((level: any) => (
            <SeniorityLevelCard
              key={level.level}
              name={level.level_name}
              description={level.description}
              level={level.level}
              completed={
                level.skills.filter((skill: any) => !skill.is_attained).length === 0 && level.skills.length > 0
              }
              skills={level.skills}
            />
          ))}
        </>
      )}
    </main>
  );
};

export default Growth;
