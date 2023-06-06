import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Button } from '@/components/Button';

const LoginLogout = () => {
  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='my-3'>
      {!user && (
        <Button>
          <Link href='/api/auth/login'>Login or Register</Link>
        </Button>
      )}

      {user && (
        <Button>
          <Link href='/api/auth/logout'>Logout</Link>
        </Button>
      )}
    </div>
  );
};
export default LoginLogout;
