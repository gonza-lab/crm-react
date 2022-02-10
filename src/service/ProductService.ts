import axios from 'axios';
import { PaginatedRequest } from '../interfaces/PaginatedRequest';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import ProductDB from '../interfaces/ProductDB';
import axiosService from './AxiosService';

const url = 'product';

const findAll = async (
  options?: PaginatedRequest
): Promise<PaginatedResponse<ProductDB[]>> => {
  const products = await axios.get(url, {
    ...axiosService.getRequestConfig(),
    params: options,
  });

  return products.data;
};

export default { findAll };
