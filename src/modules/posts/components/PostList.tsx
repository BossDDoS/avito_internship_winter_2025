import { Empty } from 'antd';
import styled from 'styled-components';
import { PostCardContainer } from '../containers/PostCardContainer';
import { Post } from '../models/types';

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <RightPostContainer>
      <StyledList>
        {posts.length ? (
          posts.map((post) => (
            <PostCardContainer
              post={post}
              key={post.id}
            />
          ))
        ) : (
          <Empty />
        )}
      </StyledList>
    </RightPostContainer>
  );
}

const RightPostContainer = styled.div`
  flex: 1;
  flex-basis: 65%;

  @media (max-width: 1024px) {
    flex-basis: 100%;
  }
`;

const StyledList = styled.ul`
  @media (max-width: 1024px) {
    padding: 0;
    margin: 0 auto;
  }
`;
