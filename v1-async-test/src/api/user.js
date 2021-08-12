import { API } from '../utils/api.js';

const USER_URL = `https://jsonplaceholder.typicode.com/users`;

export const getUser = async () => {
  try {
    const response = await API.get(USER_URL);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create Member Error: ${error}`);
  }
};
