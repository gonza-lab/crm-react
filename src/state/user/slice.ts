import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDB } from '../../interfaces/User';
import AuthService from '../../service/AuthService';

enum Status {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}
export interface UserState {
  status: Status;
  data?: UserDB;
  error?: number;
}

const defaultState: UserState = {
  status: Status.idle,
};

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const authService = new AuthService();
      const response = await authService.login({ email, password });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

const slice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = Status.loading;
    });

    builder.addCase(login.rejected, (state, action: any) => {
      state.status = Status.failed;
      state.error = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.status = Status.succeeded;
      state.data = action.payload.data;
      state.error = undefined;
    });
  },
});

export { Status as UserStoreStatus };

export default slice.reducer;
