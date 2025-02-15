import {
  PostContainer,
  PostListContainer,
  PostFormContainer,
} from '../modules/posts';
import { NotFoundPage } from './NotFoundPage';

import type { ComponentType } from 'react';

type ConfigItemType = {
  path: string;
  redirectTo?: string;
  Component?: ComponentType;
  key?: string;
  parentKey?: string;
};

export const config: ConfigItemType[] = [
  {
    path: '/',
    redirectTo: '/list',
  },
  {
    path: '/list',
    Component: PostListContainer,
    key: 'list',
  },
  {
    path: '/item/:slug',
    Component: PostContainer,
    key: 'itemDetail',
    parentKey: 'list',
  },
  {
    path: '/form',
    Component: PostFormContainer,
    key: 'itemCreate',
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
