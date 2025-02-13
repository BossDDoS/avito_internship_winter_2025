import { baseApi } from 'store/baseApi';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<object, void>({
      query: () => 'list',
    }),
  }),
});

// eslint-disable-next-line
// @ts-ignore
export const { useGetPostsQuery } = postsApi;
