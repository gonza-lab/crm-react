import axios from 'axios';
import UserDB from '../interfaces/UserDB';
import axiosService from './AxiosService';

const url = 'user';

const findByFullName = async (fullName: string): Promise<UserDB[]> => {
  const users = await axios.get(url, {
    ...axiosService.getRequestConfig(),
    params: {
      q: fullName,
    },
  });

  return users.data;
};

const findAll = async (): Promise<UserDB[]> => {
  const users = await axios.get(url, {
    ...axiosService.getRequestConfig(),
    params: {
      q: '',
    },
  });

  return users.data;
};

export default { findByFullName, findAll };
