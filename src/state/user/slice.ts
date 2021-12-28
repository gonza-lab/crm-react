import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDB } from '../../interfaces/User';
import AuthService from '../../service/AuthService';

enum Status {
  renew = 'renew token',
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
  status: Status.renew,
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

export const renew = createAsyncThunk('user/renew', async () => {
  const authService = new AuthService();

  const response = await authService.renew();
  return response;
});

const slice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    setStatus: (state, { payload }: { payload: Status }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    //LOGIN
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

      localStorage.setItem('x-token', action.payload.data.jwt);
    });

    //RENEW
    builder.addCase(renew.pending, (state) => {
      state.status = Status.renew;
    });

    builder.addCase(renew.rejected, (state) => {
      state.status = Status.idle;
    });

    builder.addCase(renew.fulfilled, (state, action) => {
      state.status = Status.succeeded;
      state.data = action.payload.data;
      localStorage.setItem('x-token', action.payload.data.jwt);
    });
  },
});

export const { setStatus } = slice.actions;

export { Status as UserStoreStatus };

export default slice.reducer;
