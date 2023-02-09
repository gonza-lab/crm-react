import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from './auth/slice';
import ordersSlice from './orders/slice';
import userSlice from './users/slice';
import productSlice from './products/slice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    orders: ordersSlice,
    users: userSlice,
    products: productSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
