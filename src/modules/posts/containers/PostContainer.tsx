import React from 'react';
import { useParams } from 'react-router-dom';

export function PostContainer() {
  const { slug } = useParams();

  return <div>PostContainer {slug}</div>;
}
