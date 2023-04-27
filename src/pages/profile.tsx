import LoginLogout from '@/components/LoginLogout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.nickname}</p>
    </div>
  );
};

export default withPageAuthRequired(Profile);
