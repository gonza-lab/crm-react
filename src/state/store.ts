import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from './user/slice';
import ordersSlice from './orders/slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    orders: ordersSlice,
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
