import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';

export function PostListContainer() {
  return (
    <View large>
      <StyledCard
        title='Card title'
        variant='borderless'
      >
        <Title level={2}>asdas</Title>
      </StyledCard>
    </View>
  );
}

const View = styled.div<{ large: boolean }>`
  width: ${({ large }) => (large ? '50%' : '30%')};
  margin: 0 auto;

  :hover {
    color: tomato;
  }
`;

const StyledCard = styled(Card)`
  :hover {
    transform: scale(2);
  }
`;
