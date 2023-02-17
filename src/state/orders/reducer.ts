import { createAsyncThunk } from '@reduxjs/toolkit';

import orderService from '../../service/OrderService';

const readAllStatus = createAsyncThunk(
  'order/order-status_read_all',
  async () => {
    return await orderService.readAllStatus();
  }
);

const count = createAsyncThunk('orders/count', async () => {
  return await orderService.count();
});

export { readAllStatus as readAllOrderStatus, count as countOrders };
