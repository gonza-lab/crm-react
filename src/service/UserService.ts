import axios from 'axios';
import UserDB from '../interfaces/UserDB';

const url = 'user';

const getToken = (): string => localStorage.getItem('x-token') || '';

const findByFullName = async (fullName: string): Promise<UserDB[]> => {
  const token = getToken();

  const users = await axios.get(url, {
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

const findAll = async (): Promise<UserDB[]> => {
  const token = getToken();

  const users = await axios.get(url, {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: '',
    },
  });

  return users.data;
};

export default { findByFullName, findAll };
