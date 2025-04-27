/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getToken = createAsyncThunk(
  'authData/getToken',
  async (reqBody, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5001/api/v1/login', reqBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.statusText !== 'OK') { throw new Error('Server Error!'); }

      const { token, username } = res.data;

      localStorage.setItem('user', JSON.stringify({ token, username }));

      return { token, username };
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
    builder
      .addCase(getToken.fulfilled, (state, { payload }) => {
        state.error = null;
        state.token = payload.token;
        state.username = payload.username;
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { authReset, setAuthData } = authSlice.actions;
export default authSlice.reducer;
