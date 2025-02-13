import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: () => ({}),
});
