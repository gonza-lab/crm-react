import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import OrderDB from '../../interfaces/OrderDB';
import OrderStatusDB from '../../interfaces/OrderStatusDB';
import { PaginatedRequest } from '../../interfaces/PaginatedRequest';
import { PaginatedResponse } from '../../interfaces/PaginatedResponse';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '../store';
import {
  createOrder,
  readAllOrders,
  readAllOrderStatus,
  updateOrder,
} from './reducer';

enum OrderStatus {
  idle = 'idle',
  loadingOrders = 'loading orders',
  creatingOrder = 'creating order',
  updatingOrder = 'updating order',
}

enum OrderStatusStatus {
  idle = 'idle',
  loadingOrdersStatus = 'loading orders status',
}

export interface StateDrawer {
  isOpen: boolean;
  orderId: EntityId;
}

export interface OrderState {
  status: {
    order: OrderStatus;
    order_status: OrderStatusStatus;
  };
  error: null;
  drawer: StateDrawer;
  total_count: number;
  order_status: OrderStatusDB[];
}

const orderAdapter = createEntityAdapter<OrderDB>({});

const initialState = orderAdapter.getInitialState<OrderState>({
  status: { order: OrderStatus.idle, order_status: OrderStatusStatus.idle },
  error: null,
  drawer: {
    isOpen: false,
    orderId: 0,
  },
  total_count: 0,
  order_status: [],
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
      state.status.order = OrderStatus.loadingOrders;
    });

    builder.addCase(readAllOrders.fulfilled, (state, action) => {
      state.status.order = OrderStatus.idle;
      state.total_count = action.payload.pagination.total_count;
      orderAdapter.setAll(state, action.payload.data);
    });

    builder.addCase(createOrder.pending, (state) => {
      state.status.order = OrderStatus.creatingOrder;
    });

    builder.addCase(createOrder.fulfilled, (state) => {
      state.status.order = OrderStatus.idle;
    });

    builder.addCase(updateOrder.pending, (state) => {
      state.status.order = OrderStatus.updatingOrder;
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      orderAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });

    builder.addCase(readAllOrderStatus.pending, (state) => {
      state.status.order_status = OrderStatusStatus.loadingOrdersStatus;
    });

    builder.addCase(readAllOrderStatus.fulfilled, (state, action) => {
      state.status.order_status = OrderStatusStatus.idle;
      state.order_status = action.payload;
    });
  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (options) => {
        return {
          url: '/order',
          method: 'GET',
          params: options,
        };
      },
      providesTags: ['Order'],
      transformResponse: (res: PaginatedResponse<OrderDB[]>) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetOrdersQuery } = extendedApiSlice;

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

export { OrderStatus };

export default slice.reducer;
