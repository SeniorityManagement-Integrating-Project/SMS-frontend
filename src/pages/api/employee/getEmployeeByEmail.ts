// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

// Obtain the list of skills from the API)
export default withApiAuthRequired(async function getEmployeeByEmail(req, res) {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/email/${req.query.userEmail}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const employee = await response.json();
    if (employee.message) {
      res.status(404).json({ messagee: employee.message });
    } else {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(401).json({ message: 'You are not authorized to access this resource.' });
  }
});
