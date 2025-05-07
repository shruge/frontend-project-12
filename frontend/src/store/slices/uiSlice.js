import { createSlice } from '@reduxjs/toolkit'
import { channelsApi } from '../api/channelsApi'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      mode: 'add',
      channelId: '',
      isOpen: false,
    },
    currChannel: '1',
    defaultChannel: '1',
  },
  reducers: {
    openModal(state, { payload }) {
      state.modal.isOpen = true
      state.modal.mode = payload.mode
      state.modal.channelId = payload.channelId || ''
    },
    closeModal(state) {
      state.modal.mode = 'add'
      state.modal.isOpen = false
      state.modal.channelId = ''
    },
    setCurrChannel(state, { payload }) {
      state.currChannel = payload.id
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
        state.currChannel = payload.id
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchFulfilled, (state, { payload }) => {
        if (state.currChannel === payload.id) {
          state.currChannel = state.defaultChannel
        }
      })
  },
})

export const { setCurrChannel, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer
