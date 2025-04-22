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
  initialState: {
    data: [],
    currChannel: '',
    defaultChannel: '',
  },
  reducers: {
    setChannel(state, { payload }) {
      state.currChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.currChannel = payload[0].id;
        state.defaultChannel = payload[0].id;
      })
      .addCase(getChannels.rejected, (_, { payload }) => {
        console.log(payload, 'channels rej');
      });
  },
});

export const { setChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
