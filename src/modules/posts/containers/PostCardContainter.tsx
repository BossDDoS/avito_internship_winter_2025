import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import styled from 'styled-components';
import { config } from 'pages/config';
import { Post } from '../models/types';

export type PostCardContainerProps = {
  post: Post;
};

export function PostCardContainer({ post }: PostCardContainerProps) {
  const navigate = useNavigate();

  const itemPath =
    config.find((route) => route.key === 'itemDetail')?.path || '/item/:slug';
  const finalPath = itemPath.replace(':slug', post.id);

  const handleEditClick = () => {
    navigate(finalPath);
  };

  return (
    <StyledCard title={post.name}>
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
