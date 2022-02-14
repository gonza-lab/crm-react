import axios from 'axios';
import { CreateOrderRequest } from '../interfaces/CreateOrderRequest';
import OrderDB from '../interfaces/OrderDB';
import { ReadAllOrderResponse } from '../interfaces/ReadAllOrderResponse';
import axiosService from './AxiosService';

const url = 'order';

const readAll = async (): Promise<ReadAllOrderResponse> => {
  const orders = await axios.get<ReadAllOrderResponse>(
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
