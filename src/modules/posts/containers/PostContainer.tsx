import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useLazyGetPostQuery,
} from '../models/api';
import { Button, Card, message, Modal } from 'antd';
import { config } from 'pages/config';

export function PostContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [triggerGetPost, { data: post, isLoading, isError }] =
    useLazyGetPostQuery();
  const [deletePost] = useDeletePostMutation();
  const { refetch } = useGetPostsQuery();

  const navigate = useNavigate();

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

  return (
    <Card>
      <h1>Объявление: {post.name}</h1>
      <p>{post.description}</p>
      <p>
        <strong>Местоположение:</strong> {post.location}
      </p>
      <p>
        <strong>Тип:</strong> {post.type}
      </p>
      {post.type === 'Недвижимость' && (
        <>
          <p>
            <strong>Тип недвижимости:</strong> {post.propertyType}
          </p>
          <p>
            <strong>Площадь:</strong> {post.area} м²
          </p>
          <p>
            <strong>Комнат:</strong> {post.rooms}
          </p>
          <p>
            <strong>Цена:</strong> {post.price} ₽
          </p>
        </>
      )}
      {post.type === 'Авто' && (
        <>
          <p>
            <strong>Марка:</strong> {post.brand}
          </p>
          <p>
            <strong>Модель:</strong> {post.model}
          </p>
          <p>
            <strong>Год выпуска:</strong> {post.year}
          </p>
          <p>
            <strong>Пробег:</strong> {post.mileage} км
          </p>
        </>
      )}
      {post.type === 'Услуги' && (
        <>
          <p>
            <strong>Тип услуги:</strong> {post.serviceType}
          </p>
          <p>
            <strong>Опыт:</strong> {post.experience} лет
          </p>
          <p>
            <strong>Стоимость:</strong> {post.cost} ₽
          </p>
        </>
      )}

      <div>
        <Button
          type='primary'
          onClick={handleBackClick}
        >
          К объявлениям
        </Button>
        <Button onClick={() => navigate('/form', { state: { post } })}>
          Редактировать
        </Button>
        <Button
          danger
          type='primary'
          onClick={showModal}
        >
          Удалить
        </Button>
      </div>

      <Modal
        title='Подтвердите удаление поста'
        cancelText='Нет'
        okText='Да'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Вы уверены, что хотите удалить этот пост?</p>
      </Modal>
    </Card>
  );
}
