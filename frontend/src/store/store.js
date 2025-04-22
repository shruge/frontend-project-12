import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authSlice';
import channelsReducer from './slices/channelsSlice';

export default configureStore({
  reducer: {
    authData: authUserReducer,
    channelsApi: channelsReducer,
  },
});
