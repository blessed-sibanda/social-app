import jsonHeaders from './json-headers';

const BASE_URL = '/api/auth';

const signin = async (user) => {
  try {
    let response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const signout = async () => {
  try {
    let response = await fetch(`${BASE_URL}/signout`, {
      method: 'GET',
      headers: jsonHeaders,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { signin, signout };
