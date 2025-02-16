import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Pagination, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { PostCardContainer } from './PostCardContainter';
import { useGetPostsQuery } from '../models/api';
import { config } from 'pages/config';

export function PostListContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  const createRoute =
    config.find((route) => route.key === 'itemCreate')?.path || '/form';

  const handleCreatePostClick = () => {
    navigate(createRoute);
  };

  const filteredPosts = posts
    ? posts.filter((post) =>
        post.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const getCurrentPagePosts = () => {
    if (!posts) return [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredPosts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  if (!posts) return <div>Error loading posts</div>;

  return (
    <StyledContainer>
      <Title level={2}>Список объявлений</Title>
      <Input.Search
        placeholder='Поиск по названию'
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type='primary'
        onClick={handleCreatePostClick}
      >
        Разместить объявление
      </Button>
      <StyledList>
        {getCurrentPagePosts().length ? (
          getCurrentPagePosts().map((post) => (
            <PostCardContainer
              post={post}
              key={post.id}
            />
          ))
        ) : (
          <Empty />
        )}
      </StyledList>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredPosts.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 20px;
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0 auto;
`;
