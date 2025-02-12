import { PostContainer, PostListContainer } from '../modules/posts';
import { NotFoundPage } from './NotFoundPage';

import type { ComponentType } from 'react';

type ConfigItemType = {
  path: string;
  redirectTo?: string;
  Component?: ComponentType;
};

export const config: ConfigItemType[] = [
  {
    path: '/',
    redirectTo: '/list',
  },
  {
    path: '/list',
    Component: PostListContainer,
  },
  {
    path: '/item/:slug',
    Component: PostContainer,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
