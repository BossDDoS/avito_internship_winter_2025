import { Input, Select, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';

type FiltersProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedTypeCategory: string | null;
  setSelectedTypeCategory: (value: string | null) => void;
  typeCategories: string[];
  onCreatePost: () => void;
};

export function Filters({
  searchTerm,
  setSearchTerm,
  selectedTypeCategory,
  setSelectedTypeCategory,
  typeCategories,
  onCreatePost,
}: FiltersProps) {
  return (
    <LeftPostContainer>
      <Title level={3}>Поиск по названию</Title>
      <StyledSearch
        placeholder='Поиск по названию'
        allowClear
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Title level={3}>Поиск по категории</Title>
      <StyledSelect
        placeholder='Выберите категорию'
        allowClear
        value={selectedTypeCategory}
        onChange={(value) => setSelectedTypeCategory(value as string | null)}
        options={typeCategories.map((category) => ({
          value: category,
          label: category,
        }))}
      />
      <StyledButton
        type='primary'
        onClick={onCreatePost}
      >
        Разместить объявление
      </StyledButton>
    </LeftPostContainer>
  );
}

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
