import { AxiosRequestConfig } from 'axios';
import { getToken } from './Token';

const getRequestConfig = (): AxiosRequestConfig => ({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default { getRequestConfig };
