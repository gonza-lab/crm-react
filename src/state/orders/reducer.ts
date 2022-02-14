import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateOrderRequest } from '../../interfaces/CreateOrderRequest';
import orderService from '../../service/OrderService';

const create = createAsyncThunk(
  'orders/create',
  async (data: CreateOrderRequest) => {
    return await orderService.create(data);
  }
);

const readAll = createAsyncThunk('orders/read_all', async () => {
  const response = await orderService.readAll();

  return response;
});

export { create as createOrder, readAll as readAllOrders };
