import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginLogout from '@components/LoginLogout';
import Image from 'next/image';

const Home = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push(`/profile/${user.sub?.slice(6)}`);
    }
  }, [user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <div className='flex flex-col items-center justify-center md:flex-row xl:p-60 xl:pb-10 md:pb-10 md:p-36 p-10 gap-4'>
        <div>
          <h1 className='lg:text-6xl md:text-5xl text-4xl font-black text-primary mb-6'>Seniority Managament System</h1>
          <p>
            Our Seniority Management System is a tool designed to streamline and optimize the management of developer
            seniority within your organization. With this app, you can easily assign levels and skills and track the
            career progression of your developers based on their roles. The app also features a seamless certification
            system, allowing employees to upload their certifications to demonstrate their expertise. With our app, you
            can effectively nurture talent, unlock the full potential of your team, and drive sustainable growth for
            your organization.
          </p>
        </div>
        <Image alt='growth ilustration' src='/ilustration.svg' width={350} height={350} />
      </div>
      <div className='flex justify-center items-baseline gap-5 w-full pb-20'>
        <Image alt='growth ilustration' src='/udea.svg' width={100} height={50} />
        <div className='w-3 h-3 bg-primary' />
        <Image alt='growth ilustration' src='/softserve.svg' width={200} height={50} />
      </div>
      <div className='flex justify-center'>
        <LoginLogout />
      </div>
    </main>
  );
};

export default Home;
