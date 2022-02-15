import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateOrderRequest } from '../../interfaces/CreateOrderRequest';
import { PaginatedRequest } from '../../interfaces/PaginatedRequest';
import orderService from '../../service/OrderService';

const create = createAsyncThunk(
  'orders/create',
  async (data: CreateOrderRequest) => {
    return await orderService.create(data);
  }
);

const readAll = createAsyncThunk(
  'orders/read_all',
  async (options?: PaginatedRequest) => {
    const response = await orderService.readAll(options);

    return response;
  }
);

export { create as createOrder, readAll as readAllOrders };
