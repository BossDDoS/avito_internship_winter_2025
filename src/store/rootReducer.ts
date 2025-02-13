import { combineReducers } from '@reduxjs/toolkit';
import { postSlice } from 'modules/posts';
import { baseApi } from './baseApi';

export const rootReducer = combineReducers({
  [postSlice.name]: postSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
