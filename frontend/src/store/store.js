import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authSlice';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';

export default configureStore({
  reducer: {
    authData: authUserReducer,
    channelsApi: channelsReducer,
    messagesApi: messagesReducer,
  },
});
