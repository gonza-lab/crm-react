import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import OrderDB from '../../interfaces/OrderDB';
import CountOrderStatus from './enums/CountOrderStatus';
import OrderStatusStatus from './enums/OrderStatusStatus';
import OrderState from './interfaces/OrderState';
import { countOrders, readAllOrderStatus } from './reducer';

const orderAdapter = createEntityAdapter<OrderDB>({});

const initialState = orderAdapter.getInitialState<OrderState>({
  status: {
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
    increaseOneTotalCount: (state) => {
      state.total_count += 1;
    },
  },
  extraReducers(builder) {
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

export const {
  selectOrderDrawer,
  openDrawer: openOrdersDrawer,
  closeDrawer: closeOrdersDrawer,
  setPage: setTablePageOrder,
  setRowsPerPAge: setTableRowsPerPageOrder,
  increaseOneTotalCount,
} = slice.actions;

export default slice.reducer;
