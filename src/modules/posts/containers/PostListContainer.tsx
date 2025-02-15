import { Button, Empty } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { PostCardContainer } from './PostCardContainter';
import { useGetPostsQuery } from '../models/api';
import { useNavigate } from 'react-router-dom';
import { config } from 'pages/config';

export function PostListContainer() {
  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const navigate = useNavigate();

  const createRoute =
    config.find((route) => route.key === 'itemCreate')?.path || '/form';

  const handleCreatePostClick = () => {
    navigate(createRoute);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  if (!posts) return <div>Error loading posts</div>;

  return (
    <StyledContainer>
      <Title level={2}>Список объявлений</Title>
      <Button
        type='primary'
        onClick={handleCreatePostClick}
      >
        Разместить объявление
      </Button>
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
