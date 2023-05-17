// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

// Obtain the list of skills from the API)
export default withApiAuthRequired(async function setEmployee(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: req.body.name,
        email: req.body.email,
        biography: req.body.biography,
        role_id: req.body.role,
      }),
    });
    const employeeCreated = await response.json();
    res.status(200).json(employeeCreated);
  } catch (err) {
    res.status(401).json({ message: 'You are not authorized to access this resource.' });
  }
});
