import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Navbar
      items={[
        <Link key='roles' href='/admin/roles' className='hover:text-primary'>
          Roles
        </Link>,
        <Link key='skills' href='/admin/skills' className='hover:text-primary'>
          Skills
        </Link>,
        <Link key='seniority-levels' href='/admin/seniority-levels' className='hover:text-primary'>
          Seniority levels
        </Link>,
        <Link key='requests' href='/admin/requests' className='hover:text-primary'>
          Requests
        </Link>,
      ]}
    />
    <Component {...pageProps} />
  </UserProvider>
);

export default App;
