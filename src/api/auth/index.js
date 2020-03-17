import { apiUrl as BASE_URL } from '../../config';

const loginUrl = `${BASE_URL}/auth/login`;

const authUser = async (payload) => {
  const response = await fetch(loginUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response.json();
}

export {
  authUser
}