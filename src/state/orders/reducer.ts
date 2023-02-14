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

const readAllStatus = createAsyncThunk(
  'order/order-status_read_all',
  async () => {
    return await orderService.readAllStatus();
  }
);

const count = createAsyncThunk('orders/count', async () => {
  return await orderService.count();
});

export {
  create as createOrder,
  update as updateOrder,
  readAllStatus as readAllOrderStatus,
  count as countOrders,
};
