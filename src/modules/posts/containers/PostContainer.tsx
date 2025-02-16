import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, message } from 'antd';
import styled from 'styled-components';
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useLazyGetPostQuery,
} from '../models/api';
import { config } from 'pages/config';
import { placeholderImages } from '../models/placeholderImages';
import { DeleteModal } from '../components/DeleteModal';
import { PostButtons } from '../components/PostButtons';
import { PostDetails } from '../components/PostDetails';

export function PostContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [triggerGetPost, { data: post, isLoading, isError }] =
    useLazyGetPostQuery();
  const [deletePost] = useDeletePostMutation();
  const { refetch } = useGetPostsQuery();

  useEffect(() => {
    if (slug) {
      triggerGetPost(slug);
    }
  }, [slug, triggerGetPost]);

  const parentRoute = config.find(
    (route) => route.key === 'itemDetail',
  )?.parentKey;
  const backPath =
    config.find((route) => route.key === parentRoute)?.path || '/';

  const handleBackClick = () => {
    navigate(backPath);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    if (!slug) {
      message.error('Нет идентификатора');
      return;
    }

    try {
      await deletePost(slug).unwrap();
      message.success('Объявление успешно удалено');
      refetch();
      setTimeout(() => {
        navigate(backPath);
      }, 500);
    } catch (error) {
      message.error('Ошибка при удалении объявления');
      console.error('Failed to delete post:', error);
    }

    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;

  const imageSrc =
    post.image || placeholderImages[post.type] || placeholderImages.default;

  return (
    <CenteredContainer>
      <StyledCard
        cover={
          <StyledImage
            src={imageSrc}
            alt={post.name}
          />
        }
      >
        <PostDetails post={post} />

        <PostButtons
          post={post}
          onBackClick={handleBackClick}
          onDeleteClick={showModal}
        />

        <DeleteModal
          isOpen={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      </StyledCard>
    </CenteredContainer>
  );
}

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  width: 80%;
  max-width: 800px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;
