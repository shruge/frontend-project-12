import { configureStore } from '@reduxjs/toolkit'
import { channelsApi } from './api/channelsApi'
import { messagesApi } from './api/messagesApi'
import authUserReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

export default configureStore({
  reducer: {
    ui: uiReducer,
    authData: authUserReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddlware => (
    getDefaultMiddlware().concat(channelsApi.middleware, messagesApi.middleware)
  ),
})
