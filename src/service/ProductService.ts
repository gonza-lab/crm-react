import axios from 'axios';
import axiosService from './AxiosService';

const url = 'product';

const findAll = async () => {
  const products = await axios.get(url, axiosService.getRequestConfig());

  return products.data;
};

export default { findAll };
