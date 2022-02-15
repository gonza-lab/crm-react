import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import OrderDB from '../../interfaces/OrderDB';
import { RootState } from '../store';
import { compareAsc } from 'date-fns';
import { createOrder, readAllOrders } from './reducer';

enum Status {
  idle = 'idle',
  loadingOrders = 'loading orders',
  creatingOrder = 'creating order',
}

export interface StateDrawer {
  isOpen: boolean;
  orderId: EntityId;
}

export interface OrderState {
  status: Status;
  error: null;
  drawer: StateDrawer;
}

const orderAdapter = createEntityAdapter<OrderDB>({});

const initialState = orderAdapter.getInitialState<OrderState>({
  status: Status.idle,
  error: null,
  drawer: {
    isOpen: false,
    orderId: 0,
  },
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
    builder.addCase(readAllOrders.pending, (state) => {
      state.status = Status.loadingOrders;
    });

    builder.addCase(readAllOrders.fulfilled, (state, action) => {
      state.status = Status.idle;
      orderAdapter.upsertMany(state, action.payload);
    });

    builder.addCase(createOrder.pending, (state) => {
      state.status = Status.creatingOrder;
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.status = Status.idle;
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

export { Status as OrderStatus };
export default slice.reducer;
