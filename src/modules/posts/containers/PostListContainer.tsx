import { Empty } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { PostCardContainter } from './PostCardContainter';
import { useGetPostsQuery } from '../models/api';

export function PostListContainer() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  if (!posts) return <div>Error loading posts</div>;

  return (
    <StyledContainer>
      <Title level={2}>Список объявлений</Title>
      <StyledList>
        {posts.length ? (
          posts.map((post) => (
            <PostCardContainter
              post={post}
              key={post.id}
            />
          ))
        ) : (
          <Empty />
        )}
      </StyledList>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 20px;
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;
