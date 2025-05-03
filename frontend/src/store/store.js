import { configureStore } from '@reduxjs/toolkit'
import { channelsApi } from './api/channelsApi'
import { messagesApi } from './api/messagesApi'
import authUserReducer from './slices/authSlice'
import globalReducer from './slices/globalSlice'
import modalReducer from './slices/modalSlice'

export default configureStore({
  reducer: {
    authData: authUserReducer,
    global: globalReducer,
    modal: modalReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddlware => (
    getDefaultMiddlware().concat(channelsApi.middleware, messagesApi.middleware)
  ),
})
