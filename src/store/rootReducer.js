import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '@features/app/appSlice';
import authReducer from '@features/auth/authSlice';
import formReducer from '@features/form/formSlice';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  form: formReducer,
});