// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function skills(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['read:skills']
  });
  console.log(accessToken);
    //const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/`, {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const skills = await response.json();
  res.status(200).json(skills);
});