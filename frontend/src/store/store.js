import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    auth: authUserReducer,
  },
});
