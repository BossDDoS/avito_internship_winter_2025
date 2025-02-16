import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Pagination, Input, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { useGetPostsQuery } from '../models/api';
import { config } from 'pages/config';
import { PostCardContainer } from './PostCardContainer';

export function PostListContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeCategory, setSelectedTypeCategory] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  const createRoute =
    config.find((route) => route.key === 'itemCreate')?.path || '/form';

  const handleCreatePostClick = () => {
    navigate(createRoute);
  };

  const typeCategories = posts
    ? Array.from(new Set(posts.map((post) => post.type)))
    : [];

  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          post.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedTypeCategory ? post.type === selectedTypeCategory : true),
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
    <MainContainer>
      <StyledHeader level={1}>Список объявлений</StyledHeader>
      <PostContainer>
        <LeftPostContainer>
          <Title level={3}>Поиск по названию</Title>
          <StyledSearch
            placeholder='Поиск по названию'
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Title level={3}>Поиск по категории</Title>
          <StyledSelect
            placeholder='Выберите категорию'
            allowClear
            onChange={(value) =>
              setSelectedTypeCategory(value as string | null)
            }
            options={typeCategories.map((category) => ({
              value: category,
              label: category,
            }))}
          />
          <StyledButton
            type='primary'
            onClick={handleCreatePostClick}
          >
            Разместить объявление
          </StyledButton>
        </LeftPostContainer>
        <RightPostContainer>
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
        </RightPostContainer>
      </PostContainer>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredPosts.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeader = styled(Title)`
  text-align: center;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftPostContainer = styled.div`
  flex: 1;
  flex-direction: column;
  flex-basis: 35%;
  display: flex;
  align-items: center;
  align-self: flex-start;

  @media (max-width: 1024px) {
    flex-basis: 100%;
    align-self: unset;
    margin-bottom: 40px;
  }
`;

const RightPostContainer = styled.div`
  flex: 1;
  flex-basis: 65%;

  @media (max-width: 1024px) {
    flex-basis: 100%;
  }
`;

const StyledSearch = styled(Input.Search)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledList = styled.ul`
  @media (max-width: 1024px) {
    padding: 0;
    margin: 0 auto;
  }
`;
