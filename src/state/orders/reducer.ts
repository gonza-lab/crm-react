import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateOrderRequest } from '../../interfaces/CreateOrderRequest';
import { PaginatedRequest } from '../../interfaces/PaginatedRequest';
import { ReadOneOrderRequest } from '../../interfaces/ReadOneOrderRequest';
import { UpdateOrderRequest } from '../../interfaces/UpdateOrderRequest';

import orderService from '../../service/OrderService';

const create = createAsyncThunk(
  'orders/create',
  async (data: CreateOrderRequest) => {
    return await orderService.create(data);
  }
);

const update = createAsyncThunk(
  'orders/update',
  async (options: { id: number; data: UpdateOrderRequest }) => {
    return await orderService.update(options.id, options.data);
  }
);

const readOne = createAsyncThunk(
  'orders/read_one',
  async (options: ReadOneOrderRequest) => {
    const response = await orderService.readOne(options);

    return response;
  }
);

const readAll = createAsyncThunk(
  'orders/read_all',
  async (options?: PaginatedRequest) => {
    const response = await orderService.readAll(options);

    return response;
  }
);

export {
  create as createOrder,
  readAll as readAllOrders,
  readOne as readOneOrder,
  update as updateOrder,
};
