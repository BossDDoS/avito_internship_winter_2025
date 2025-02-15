import { baseApi } from 'store/baseApi';
import { Post } from './types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => ({ url: 'items', method: 'GET' }),
    }),
    getPost: build.query<Post, string>({
      query: (id) => ({ url: `items/${id}`, method: 'GET' }),
    }),
    addPost: build.mutation<object, Post>({
      query: (post) => ({ url: `items`, method: 'POST', body: post }),
    }),
    updatePost: build.mutation<object, { id: string }>({
      query: (id) => ({ url: `items/${id}`, method: 'PUT' }),
    }),
    deletePost: build.mutation<Post, string>({
      query: (id) => ({ url: `items/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddPostMutation,
} = postsApi;
