import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

interface Props {
  isEditing: boolean;
  clearDraft: () => void;
}

export function FormButtons({ isEditing, clearDraft }: Props) {
  return (
    <StyledButtons>
      <Button
        type='primary'
        htmlType='submit'
      >
        {isEditing ? 'Сохранить изменения' : 'Создать объявление'}
      </Button>
      {isEditing ? null : (
        <Button
          type='default'
          onClick={clearDraft}
        >
          Очистить
        </Button>
      )}
    </StyledButtons>
  );
}

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;
