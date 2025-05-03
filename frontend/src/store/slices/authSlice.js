/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const setLocalAuthData = ({ token, username }) => {
  localStorage.setItem('user', JSON.stringify({ token, username }));
};

const postData = async (url, reqBody) => {
  const res = await axios.post(url, reqBody, {
    headers: { 'Content-Type': 'application/json' },
  });

  const { data } = res;

  if (!Object.hasOwn(data, 'token')) { throw new Error('serverError'); }

  return data;
};

export const getToken = createAsyncThunk(
  'authData/getToken',
  async (reqBody, { rejectWithValue }) => {
    try {
      const data = await postData('/api/v1/login', reqBody);

      setLocalAuthData(data);

      return data;
    } catch ({ response = { statusText: 'networkError' } }) {
      return rejectWithValue(response.statusText);
    }
  },
);

export const createUser = createAsyncThunk(
  'authData/createUser',
  async (reqBody, { rejectWithValue }) => {
    try {
      const data = await postData('/api/v1/signup', reqBody);

      setLocalAuthData(data);

      return data;
    } catch ({ response = { statusText: 'networkError' } }) {
      console.log(response.statusText);
      return rejectWithValue(response.statusText);
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
    setAuthError(state, { payload }) {
      state.error = payload;
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
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const { authReset, setAuthData, setAuthError } = authSlice.actions;
export default authSlice.reducer;
