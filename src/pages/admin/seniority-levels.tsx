import { Loader } from '@/components/Loader';
import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';

const SeniorityLevels = () => {
  const router = useRouter();
  const { data, loading, error } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/seniority_level/`, router.isReady);
  let content;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <p>Error</p>;
  } else {
    content = (
      <div className=''>
        {data.map((seniorityLevel: any) => (
          <h2 key={seniorityLevel.id} className='text-xl font-bold text-center text-rose-500'>
            {seniorityLevel.level}: {seniorityLevel.name}
          </h2>
        ))}
      </div>
    );
  }

  return (
    <main>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Seniority levels</h1>
      {content}
    </main>
  );
};

export default SeniorityLevels;
