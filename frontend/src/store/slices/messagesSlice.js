/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannel } from './channelsSlice';

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ msgData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5001/api/v1/messages', msgData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.statusText !== 'OK') { throw new Error('Sever Error!'); }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    counts: [],
    allMessages: [],
  },
  reducers: {
    addMessage(state, { payload }) {
      state.allMessages.push(payload);
    },
  },
  extraReducers: (build) => {
    build
      .addCase(removeChannel, (state, { payload }) => {
        state.allMessages = state.allMessages.filter(({ channelId }) => channelId !== payload.id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
