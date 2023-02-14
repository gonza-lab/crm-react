import axios from 'axios';
import CountOrderResponse from '../interfaces/CountOrderResponse';
import { CreateOrderRequest } from '../interfaces/CreateOrderRequest';
import OrderDB from '../interfaces/OrderDB';
import OrderStatusDB from '../interfaces/OrderStatusDB';
import { PaginatedRequest } from '../interfaces/PaginatedRequest';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import { ReadOneOrderRequest } from '../interfaces/ReadOneOrderRequest';
import { UpdateOrderRequest } from '../interfaces/UpdateOrderRequest';
import axiosService from './AxiosService';

const url = 'order';

const readAllStatus = async (): Promise<OrderStatusDB[]> => {
  const { data } = await axios.get<OrderStatusDB[]>(
    url + '-status',
    axiosService.getRequestConfig()
  );

  return data;
};

const readAll = async (
  options?: PaginatedRequest
): Promise<PaginatedResponse<OrderDB[]>> => {
  const orders = await axios.get<PaginatedResponse<OrderDB[]>>(url, {
    ...axiosService.getRequestConfig(),
    params: options,
  });

  return orders.data;
};

const readOne = async (options: ReadOneOrderRequest): Promise<OrderDB> => {
  const orders = await axios.get<OrderDB>(url + '/' + options.id, {
    ...axiosService.getRequestConfig(),
    params: options.options,
  });

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

const update = async (
  id: number,
  data: UpdateOrderRequest
): Promise<OrderDB> => {
  const order = await axios.patch<OrderDB>(
    url + '/' + id,
    data,
    axiosService.getRequestConfig()
  );

  return order.data;
};

const count = async () => {
  const { data } = await axios.get<CountOrderResponse>(
    url + '/count',
    axiosService.getRequestConfig()
  );

  return data.count;
};

export default { readAll, create, readOne, update, readAllStatus, count };
