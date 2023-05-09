import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

const audience = process.env.AUTH0_AUDIENCE;
export default handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: audience,
            scope: 'openid profile email read:skills',
        }
    })
});


