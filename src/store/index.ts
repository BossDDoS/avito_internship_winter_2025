import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

import { baseApi } from './baseApi';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
};
