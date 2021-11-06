import jsonHeaders from './json-headers';

const BASE_URL = '/api/users';

const create = async (user) => {
  try {
    let response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      signal,
      headers: jsonHeaders,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${BASE_URL}/${params.userId}`, {
      method: 'GET',
      signal,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(`${BASE_URL}/${params.userId}`, {
      method: 'PUT',
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(`${BASE_URL}/${params.userId}`, {
      method: 'DELETE',
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { create, list, read, update, remove };
