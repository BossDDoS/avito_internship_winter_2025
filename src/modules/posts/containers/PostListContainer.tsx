import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { useGetPostsQuery } from '../models/api';
import { config } from 'pages/config';
import { Filters } from '../components/Filters';
import { PostList } from '../components/PostList';

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
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTypeCategory={selectedTypeCategory}
          setSelectedTypeCategory={setSelectedTypeCategory}
          typeCategories={typeCategories}
          onCreatePost={handleCreatePostClick}
        />
        <PostList posts={getCurrentPagePosts()} />
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
