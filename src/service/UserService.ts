import axios from 'axios';
import UserDB from '../interfaces/UserDB';

const searchByFullName = async (fullName: string): Promise<UserDB[]> => {
  const token = localStorage.getItem('x-token') || '';

  const users = await axios.get('user', {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: fullName,
    },
  });

  return users.data;
};

export default { searchByFullName };
