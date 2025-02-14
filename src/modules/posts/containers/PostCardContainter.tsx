import { Card } from 'antd';
import { Post } from '../models/types';
import styled from 'styled-components';

type PostCardContainterProps = {
  post: Post;
};

export function PostCardContainter({ post }: PostCardContainterProps) {
  return (
    <StyledCard title={post.name}>
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
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  flex: 1;
  margin-bottom: 20px;
`;
