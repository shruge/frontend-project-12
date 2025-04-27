/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../api/channelsApi';

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
      .addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
        state.currChannel = payload.id;
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchFulfilled, (state, { payload }) => {
        if (state.currChannel === payload.id) { state.currChannel = state.defaultChannel; }
      });
  },
});

export const { setCurrChannel } = globalSlice.actions;
export default globalSlice.reducer;
