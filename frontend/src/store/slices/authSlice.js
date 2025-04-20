/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    username: '',
  },
  reducers: {
    setAuthData(state, { payload }) {
      state.token = payload.token;
      state.username = payload.username;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
