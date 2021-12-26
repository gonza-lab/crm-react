import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  status: string;
  data?: {
    given_name: string;
    family_name: string;
    email: string;
    token: string;
  };
}

const defaultState: UserState = {
  status: 'idle',
};

const slice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
});

export default slice.reducer;
