import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginLogout from '@components/LoginLogout';

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
    <div>
      <h1>Index Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error assumenda, in sunt dolor tempore quia iure
        inventore! Adipisci recusandae amet itaque quisquam blanditiis asperiores deserunt vitae pariatur officia, rerum
        temporibus magnam, maxime, atque quod aut? Voluptatibus laboriosam atque itaque deleniti aliquam quas quia
        architecto molestias! Doloribus ex molestias fuga.
      </p>
      <LoginLogout />
    </div>
  );
};

export default Home;
