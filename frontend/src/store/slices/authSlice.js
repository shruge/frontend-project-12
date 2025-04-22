/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getChannels } from './channelsSlice';

export const getToken = createAsyncThunk(
  'authData/getToken',
  async (reqBody, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post('http://localhost:5001/api/v1/login', reqBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.statusText !== 'OK') { throw new Error('Server Error!'); }

      const { token, username } = res.data;

      localStorage.setItem('user', JSON.stringify({ token, username }));
      // eslint-disable-next-line no-use-before-define
      dispatch(setAuthData({ token, username }));
      // eslint-disable-next-line no-use-before-define
      dispatch(getChannels(token));

      return token;
    } catch (error) {
      return rejectWithValue('Неверные имя пользователя или пароль');
    }
  },
);

const authSlice = createSlice({
  name: 'authData',
  initialState: {
    token: '',
    username: '',
    error: null,
  },
  reducers: {
    setAuthData(state, { payload }) {
      state.error = null;
      state.token = payload.token;
      state.username = payload.username;
    },
    authReset(state) {
      state.token = '';
      state.error = null;
      state.username = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const { authReset, setAuthData } = authSlice.actions;
export default authSlice.reducer;
