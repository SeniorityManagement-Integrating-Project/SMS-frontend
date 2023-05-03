import { useUser } from '@auth0/nextjs-auth0/client';
import { NextPage } from 'next';
import Link from 'next/link';
import LoginLogout from '@components/LoginLogout';

const GrowthPathPage: NextPage = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const profileRoute = `/profile/${user.sub?.slice(6)}`;
    return (
      <div>
        <LoginLogout />
        {user && (
          <div>
            <h1>
              <strong>Growth Path Page</strong>
            </h1>
            <h2>ID: {user.sub}</h2>
            <h2>Name: {user.name}</h2>
            <p className='text-gray-400 font-mono underline'>
              My seniority levels with their respective skills should be here (HU_G001 - HU_G002)
            </p>
            <Link href={profileRoute} className='text-violet-600 font-bold'>
              Go Back to Profile
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      Please log in to view your <strong>growth path.</strong>
    </div>
  );
};

export default GrowthPathPage;
