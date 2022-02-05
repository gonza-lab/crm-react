import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from './auth/slice';
import ordersSlice from './orders/slice';
import userSlice from './users/slice';
import productSlice from './products/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    orders: ordersSlice,
    users: userSlice,
    products: productSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
