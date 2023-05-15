import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
);

export default App;
