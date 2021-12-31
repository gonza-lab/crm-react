import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import OrderService from '../../service/OrderService';
import { RootState } from '../store';

enum Status {
  idle = 'idle',
  loadingOrders = 'loading orders',
}

interface State {
  status: Status;
  error: null;
}

const orderAdapter = createEntityAdapter();

const initialState = orderAdapter.getInitialState<State>({
  status: Status.idle,
  error: null,
});

const readAll = createAsyncThunk('orders/read_all', async () => {
  const orderService = new OrderService();
  const response = await orderService.readAll();

  return response;
});

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(readAll.pending, (state) => {
      state.status = Status.loadingOrders;
    });

    builder.addCase(readAll.fulfilled, (state, action) => {
      state.status = Status.idle;
      orderAdapter.upsertMany(state, action.payload.data);
    });
  },
});

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrdersIds,
} = orderAdapter.getSelectors<RootState>((state) => state.orders);

export { readAll };

export default slice.reducer;
