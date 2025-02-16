import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, FormProps, Button } from 'antd';
import styled from 'styled-components';
import { Post } from '../models/types';
import { config } from 'pages/config';
import { FormButtons } from './FormButtons';
import { CategoryFields } from './CategoryFields';

interface Props {
  form: any;
  onSubmit: (values: Post) => void;
  onChange: () => void;
  isEditing: boolean;
  clearDraft: () => void;
  category: string;
  setCategory: (value: string) => void;
}

export function PostForm({
  form,
  onSubmit,
  onChange,
  isEditing,
  clearDraft,
  category,
  setCategory,
}: Props) {
  const navigate = useNavigate();

  const listRoute = config.find((route) => route.key === 'list')?.path || '/';

  const handleBackClick = () => {
    navigate(listRoute);
  };

  return (
    <StyledForm
      form={form}
      layout='vertical'
      onFinish={onSubmit}
      onValuesChange={onChange}
    >
      {!isEditing ? (
        <StyledBackButton
          type='primary'
          onClick={handleBackClick}
        >
          К объявлениям
        </StyledBackButton>
      ) : (
        <></>
      )}

      <Form.Item
        label='Название'
        name='name'
        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Описание'
        name='description'
        rules={[{ required: true, message: 'Пожалуйста, введите описание!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label='Локация'
        name='location'
        rules={[{ required: true, message: 'Пожалуйста, введите локацию!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Категория'
        name='type'
        rules={[{ required: true, message: 'Пожалуйста, выберите категорию!' }]}
      >
        <Select
          onChange={(value) => setCategory(value)}
          value={category}
        >
          <Select.Option value='Недвижимость'>Недвижимость</Select.Option>
          <Select.Option value='Авто'>Авто</Select.Option>
          <Select.Option value='Услуги'>Услуги</Select.Option>
        </Select>
      </Form.Item>

      <CategoryFields category={category} />

      <FormButtons
        isEditing={isEditing}
        clearDraft={clearDraft}
      />
    </StyledForm>
  );
}

const StyledForm = styled(Form)<FormProps<Post>>`
  width: 80%;
  max-width: 800px;
`;

const StyledBackButton = styled(Button)`
  margin-bottom: 20px;
`;
