// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

// Obtain the list of skills from the API)
export default withApiAuthRequired(async function getAllRoles(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const roles = await response.json();
    res.status(200).json(roles);
  } catch (err) {
    res.status(401).json({ message: 'You are not authorized to access this resource.' });
  }
});
