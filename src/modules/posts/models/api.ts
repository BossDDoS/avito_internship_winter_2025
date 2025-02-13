import { baseApi } from 'store/baseApi';
import { Post } from './types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => ({ url: 'items', method: 'GET' }),
    }),
    getPost: build.query<Post, { id: string }>({
      query: (id) => ({ url: `items/:${id}`, method: 'GET' }),
    }),
    updatePost: build.mutation<object, { id: string }>({
      query: (id) => ({ url: `items/:${id}`, method: 'PUT' }),
    }),
    deletePost: build.mutation<object, { id: string }>({
      query: (id) => ({ url: `items/:${id}`, method: 'DELETE' }),
    }),
    addPost: build.mutation<object, { post: Post }>({
      query: (post) => ({ url: `items`, method: 'POST', body: post }),
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
