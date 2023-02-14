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
import {
  countOrders,
  createOrder,
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

enum CountOrderStatus {
  idle = 'idle',
  countingOrders = 'counting orders',
}

export interface StateDrawer {
  isOpen: boolean;
  orderId: EntityId;
}

export interface OrderState {
  status: {
    order: OrderStatus;
    order_status: OrderStatusStatus;
    count_order_status: CountOrderStatus;
  };
  error: null;
  drawer: StateDrawer;
  total_count: number;
  order_status: OrderStatusDB[];
  table: {
    rowsPerPage: number;
    page: number;
  };
}

const orderAdapter = createEntityAdapter<OrderDB>({});

const initialState = orderAdapter.getInitialState<OrderState>({
  status: {
    order: OrderStatus.idle,
    order_status: OrderStatusStatus.idle,
    count_order_status: CountOrderStatus.idle,
  },
  error: null,
  drawer: {
    isOpen: false,
    orderId: 0,
  },
  total_count: 0,
  order_status: [],
  table: {
    rowsPerPage: 5,
    page: 0,
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
    setRowsPerPAge: (state, action: PayloadAction<number>) => {
      state.table.rowsPerPage = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.table.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createOrder.pending, (state) => {
      state.status.order = OrderStatus.creatingOrder;
    });

    builder.addCase(createOrder.fulfilled, (state) => {
      state.status.order = OrderStatus.idle;
      state.total_count += 1;
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

    builder.addCase(countOrders.pending, (state) => {
      state.status.count_order_status = CountOrderStatus.countingOrders;
    });

    builder.addCase(countOrders.fulfilled, (state, action) => {
      state.status.count_order_status = CountOrderStatus.idle;
      state.total_count = action.payload;
    });
  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderDB[], PaginatedRequest>({
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
    getOrderById: builder.query<OrderDB, number>({
      query: (id) => '/order/' + id,
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = extendedApiSlice;

export const {
  selectOrderDrawer,
  openDrawer: openOrdersDrawer,
  closeDrawer: closeOrdersDrawer,
  setPage: setTablePageOrder,
  setRowsPerPAge: setTableRowsPerPageOrder,
} = slice.actions;

export { OrderStatus };

export default slice.reducer;
