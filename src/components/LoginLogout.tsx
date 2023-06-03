import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const LoginLogout = () => {
  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='my-3'>
      {!user && (
        <Link href='/api/auth/login' className='w-32 px-5 py-2 text-lg text-white rounded-full bg-rose-600'>
          Login
        </Link>
      )}

      {user && (
        <Link href='/api/auth/logout' className='w-32 px-5 py-2 text-lg text-white rounded-full bg-rose-600'>
          Logout
        </Link>
      )}
    </div>
  );
};
export default LoginLogout;
