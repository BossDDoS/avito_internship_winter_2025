import React from 'react';
import { useGetPostsQuery } from '../models/api';

export function PostListContainer() {
  const data = useGetPostsQuery();

  console.log(data);

  return <div>PostListContainer</div>;
}
