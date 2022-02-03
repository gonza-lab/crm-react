/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserDB from '../../interfaces/UserDB';
import UserUpdateRequest from '../../interfaces/UserUpdateRequest';
import AuthService from '../../service/AuthService';

enum Status {
  renew = 'renew token',
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
  updatingData = 'updating data',
}
export interface AuthState {
  status: Status;
  data?: UserDB;
  error?: number;
  auth: boolean;
}

const defaultState: AuthState = {
  status: Status.renew,
  auth: false,
};

//THUNKS
export const login = createAsyncThunk(
  'auth/login',
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

export const renew = createAsyncThunk('auth/renew', async () => {
  const authService = new AuthService();

  const response = await authService.renew();
  return response;
});

export const updateData = createAsyncThunk(
  'auth/update_data',
  async (changes: UserUpdateRequest) => {
    const authService = new AuthService();

    if (!changes.password) delete changes.password;

    await authService.update(changes);

    delete changes.password;
    return changes;
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    setStatus: (state, { payload }: { payload: Status }) => {
      state.status = payload;
    },
    logout: (state) => {
      state.data = undefined;
      state.error = undefined;
      state.auth = false;
      localStorage.removeItem('x-token');
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
      state.auth = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.status = Status.succeeded;
      state.data = action.payload;
      state.error = undefined;
      state.auth = true;

      localStorage.setItem('x-token', action.payload.access_token);
    });

    //RENEW
    builder.addCase(renew.pending, (state) => {
      state.status = Status.renew;
    });

    builder.addCase(renew.rejected, (state) => {
      state.status = Status.idle;
      state.auth = false;
    });

    builder.addCase(renew.fulfilled, (state, action) => {
      state.status = Status.succeeded;
      state.data = action.payload;
      state.auth = true;
      localStorage.setItem('x-token', action.payload.access_token);
    });

    //USER
    builder.addCase(updateData.pending, (state) => {
      state.status = Status.updatingData;
    });

    builder.addCase(updateData.fulfilled, (state, { payload }) => {
      state.status = Status.succeeded;
      Object.assign(state.data, payload);
    });
  },
});

export const { setStatus, logout } = slice.actions;

export { Status as AuthStoreStatus };

export default slice.reducer;
