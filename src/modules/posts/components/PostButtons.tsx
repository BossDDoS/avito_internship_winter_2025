import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Post } from '../models/types';

import styled from 'styled-components';

interface PostButtonsProps {
  post: Post;
  onBackClick: () => void;
  onDeleteClick: () => void;
}

export function PostButtons({
  post,
  onBackClick,
  onDeleteClick,
}: PostButtonsProps) {
  const navigate = useNavigate();

  return (
    <StyledButtons>
      <LeftBarButtons>
        <Button
          type='primary'
          onClick={onBackClick}
        >
          К объявлениям
        </Button>
        <Button onClick={() => navigate('/form', { state: { post } })}>
          Редактировать
        </Button>
      </LeftBarButtons>

      <Button
        danger
        type='primary'
        onClick={onDeleteClick}
      >
        Удалить
      </Button>
    </StyledButtons>
  );
}

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftBarButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;
