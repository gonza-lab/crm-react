import axios from 'axios';
import { getToken } from './Token';

const url = 'product';
const baseURL = process.env.REACT_APP_API_URL;

const findAll = async () => {
  const token = getToken();

  const products = await axios.get(url, {
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return products.data;
};

export default { findAll };
