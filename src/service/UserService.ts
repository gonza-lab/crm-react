import axios from 'axios';
import UserDB from '../interfaces/UserDB';
import { getToken } from './Token';

const url = 'user';
const baseURL = process.env.REACT_APP_API_URL;

const findByFullName = async (fullName: string): Promise<UserDB[]> => {
  const token = getToken();

  const users = await axios.get(url, {
    baseURL,
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
    baseURL,
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
