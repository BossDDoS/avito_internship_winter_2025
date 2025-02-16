import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import styled from 'styled-components';
import { config } from 'pages/config';
import { Post } from '../models/types';
import { placeholderImages } from '../models/placeholderImages';

export type PostCardContainerProps = {
  post: Post;
};

export function PostCardContainer({ post }: PostCardContainerProps) {
  const navigate = useNavigate();
  const imageSrc =
    post.image || placeholderImages[post.type] || placeholderImages.default;

  const itemPath =
    config.find((route) => route.key === 'itemDetail')?.path || '/item/:slug';
  const finalPath = itemPath.replace(':slug', post.id);

  const handleEditClick = () => {
    navigate(finalPath);
  };

  return (
    <StyledCard
      title={post.name}
      cover={
        <StyledImage
          src={imageSrc}
          alt={post.name}
        />
      }
    >
      <div>
        <p>
          <strong>Местоположение:</strong> {post.location}
        </p>
        <p>
          <strong>Тип:</strong> {post.type}
        </p>
      </div>
      <Button onClick={handleEditClick}>Открыть</Button>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  flex: 1;
  margin-bottom: 20px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 300px;
  padding: 20px;
  object-fit: cover;
`;
