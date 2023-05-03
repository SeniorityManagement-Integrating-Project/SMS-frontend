import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const LoginLogout = () => {
  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {!user && <Link href='/api/auth/login'>Login</Link>}

      {user && <Link href='/api/auth/logout'>Logout</Link>}
    </div>
  );
};
export default LoginLogout;
