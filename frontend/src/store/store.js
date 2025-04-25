import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authSlice';
import channelsReducer from './slices/channelsSlice';
import globalReducer from './slices/globalSlice';
import messagesReducer from './slices/messagesSlice';
import modalReducer from './slices/modalSlice';

export default configureStore({
  reducer: {
    authData: authUserReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    global: globalReducer,
    modal: modalReducer,
  },
});
