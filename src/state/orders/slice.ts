import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import OrderDB from '../../interfaces/OrderDB';
import OrderService from '../../service/OrderService';
import { RootState } from '../store';
import { compareAsc } from 'date-fns';

enum Status {
  idle = 'idle',
  loadingOrders = 'loading orders',
}

export interface StateDrawer {
  isOpen: boolean;
  orderId: EntityId;
}

interface State {
  status: Status;
  error: null;
  drawer: StateDrawer;
}

const orderAdapter = createEntityAdapter<OrderDB>({
  sortComparer: (a, b) =>
    compareAsc(new Date(a.updatedAt), new Date(b.updatedAt)),
});

const initialState = orderAdapter.getInitialState<State>({
  status: Status.idle,
  error: null,
  drawer: {
    isOpen: false,
    orderId: 0,
  },
});

const readAll = createAsyncThunk('orders/read_all', async () => {
  const orderService = new OrderService();
  const response = await orderService.readAll();

  return response;
});

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<EntityId>) => {
      state.drawer.isOpen = true;
      state.drawer.orderId = action.payload;
    },
    closeDrawer: (state) => {
      state.drawer.isOpen = false;
    },
    selectOrderDrawer: (state, action: PayloadAction<number>) => {
      state.drawer.orderId = action.payload;
    },
  },
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
  selectIds: selectOrdersIds,
  selectById: selectOrderById,
} = orderAdapter.getSelectors<RootState>((state) => state.orders);

export const {
  selectOrderDrawer,
  openDrawer: openOrdersDrawer,
  closeDrawer: closeOrdersDrawer,
} = slice.actions;

export { readAll };
export { Status as OrderStatus };
export default slice.reducer;
