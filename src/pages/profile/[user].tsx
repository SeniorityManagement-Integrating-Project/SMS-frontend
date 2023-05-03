import { useUser } from '@auth0/nextjs-auth0/client';
import LoginLogout from '@/components/LoginLogout';
import { NextPage } from 'next';
import Link from 'next/link';
// import Image from 'next/image';

const ProfilePage: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const growthPathRoute = `/growthPath/${user.sub?.slice(6)}`;
    return (
      <div>
        <LoginLogout />
        {user && (
          <div>
            {/* <Image src={user.picture} alt={user.name} width={200} height={200} /> */}
            <h1>
              <strong>Profile Page</strong>
            </h1>
            <h2>ID: {user.sub}</h2>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <Link href={growthPathRoute} className='text-blue-600 font-bold'>
              View Growth Path
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      Please log in to view your <strong>profile.</strong>
    </div>
  );
};

export default ProfilePage;
