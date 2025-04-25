/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    mode: 'add',
    channelId: '',
    isOpen: false,
  },
  reducers: {
    openModal(state, { payload }) {
      state.isOpen = true;
      state.mode = payload.mode;
      state.channelId = payload.channelId || '';
    },
    closeModal(state) {
      state.mode = 'add';
      state.isOpen = false;
      state.channelId = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
