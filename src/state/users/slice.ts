import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import userService from '../../service/UserService';
import UserDB from '../../interfaces/UserDB';

enum Status {
  idle = 'loading',
  loadingUsers = 'loading users',
  usersLoaded = 'users loaded',
}

interface State {
  status: Status;
}

const userAdapter = createEntityAdapter<UserDB>();

const initialState = userAdapter.getInitialState<State>({
  status: Status.idle,
});

const readAll = createAsyncThunk('users/read_all', async () => {
  return await userService.findAll();
});

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readAll.pending, (state) => {
      state.status = Status.loadingUsers;
    });

    builder.addCase(readAll.fulfilled, (state, action) => {
      state.status = Status.usersLoaded;
      userAdapter.upsertMany(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllUsers,
  selectIds: selectUsersIds,
  selectById: selectUserById,
} = userAdapter.getSelectors<RootState>((state) => state.users);

export { readAll as readAllUsers };
export { Status as UserStoreStatus };
export default slice.reducer;
