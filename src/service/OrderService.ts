import axios from 'axios';
import { CreateOrderRequest } from '../interfaces/CreateOrderRequest';
import OrderDB from '../interfaces/OrderDB';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import axiosService from './AxiosService';

const url = 'order';

const readAll = async (): Promise<PaginatedResponse<OrderDB[]>> => {
  const orders = await axios.get<PaginatedResponse<OrderDB[]>>(
    url,
    axiosService.getRequestConfig()
  );

  return orders.data;
};

const create = async (data: CreateOrderRequest): Promise<OrderDB> => {
  const order = await axios.post<OrderDB>(
    url,
    data,
    axiosService.getRequestConfig()
  );

  return order.data;
};

export default { readAll, create };
