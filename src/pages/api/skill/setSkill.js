// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

// Obtain the list of skills from the API)
export default withApiAuthRequired(async function skills(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['write:admin']
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: req.body.name,
            description: req.body.description,
          }),
      });
      const skills = await response.json();
      res.status(200).json(skills);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "No estás autorizado para acceder a este recurso" });
  }
    
});