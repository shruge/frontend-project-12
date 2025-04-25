/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addChannel, removeChannel } from './channelsSlice';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    currChannel: '1',
    defaultChannel: '1',
  },
  reducers: {
    setCurrChannel(state, { payload }) {
      state.currChannel = payload.id;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addChannel, (state, { payload }) => {
        state.currChannel = payload.id;
      })
      .addCase(removeChannel, (state, { payload }) => {
        if (state.currChannel === payload.id) { state.currChannel = state.defaultChannel; }
      });
  },
});

export const { setCurrChannel } = globalSlice.actions;
export default globalSlice.reducer;
