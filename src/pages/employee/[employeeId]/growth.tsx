import { useRouter } from 'next/router';
import { SeniorityLevelEmployeeCard } from '@/components/SeniorityLevelEmployeeCard';
import { Loader } from '@/components/Loader';
import { useFetch } from '@/hooks/useFetch';
import { AboutPageTooltip } from '@components/AboutPageTooltip';

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
    const firstNotAchievedLevel =
      data
        .sort((a: any, b: any) => a.level - b.level)
        .find((level: any) => level.skills.some((skill: any) => !skill.is_attained))?.level || data.length + 1;
    content = (
      <>
        {data.map((level: any) => (
          <SeniorityLevelEmployeeCard
            key={level.level}
            name={level.level_name}
            description={level.description}
            level={level.level}
            completed={level.level < firstNotAchievedLevel}
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
      <AboutPageTooltip>
        <p className='text-sm'>
          This is your growth path, here you can explore your existing skills and submit requests for validation of
          those you have not yet achieved. To validate these skills, simply upload a supporting file that serves as
          evidence of your proficiency in that particular area.
        </p>
      </AboutPageTooltip>
    </main>
  );
};

export default Growth;
