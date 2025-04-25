/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5001/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.statusText !== 'OK') { throw new Error('Server Error!'); }

      const channels = res.data;
      console.log(res);

      return channels;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, { payload }) {
      state.push(payload);
    },
    renameChannel(state, { payload }) {
      const channel = state.find(({ id }) => id === payload.id);

      channel.name = payload.name;
    },
    removeChannel(state, { payload }) {
      return state.filter(({ id }) => id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (_, { payload }) => payload)
      .addCase(getChannels.rejected, (_, { payload }) => {
        console.log(payload, 'channels rej');
      });
  },
});

export const { addChannel, renameChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
