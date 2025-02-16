import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  message,
  Modal,
  FormProps,
} from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import {
  useAddPostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '../models/api';
import { config } from 'pages/config';
import { Post } from '../models/types';

const { Option } = Select;
const DRAFT_KEY = 'post_form_draft';

export function PostFormContainer() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm<Post>();
  const { refetch } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const post = location.state?.post;
  const listRoute = config.find((route) => route.key === 'list')?.path || '/';

  useEffect(() => {
    if (post) {
      form.setFieldsValue(post);
      setCategory(post.type);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [post, form]);

  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      form.setFieldsValue(parsedDraft);
      if (parsedDraft.type) setCategory(parsedDraft.type);
    }
  }, [form]);

  const handleFormChange = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form.getFieldsValue()));
  };

  const handleSubmit = async (values: Post) => {
    try {
      if (isEditing && String(post?.id)) {
        await updatePost({ id: post.id, data: values }).unwrap();
        message.success('Объявление успешно обновлено!');
      } else {
        await addPost(values).unwrap();
        message.success('Объявление успешно создано!');
      }

      localStorage.removeItem(DRAFT_KEY);
      form.resetFields();
      refetch();
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Ошибка при отправки формы:', error);
      message.error('Ошибка при создании объявления');
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    form.resetFields();
    setCategory('');
    message.success('Черновик очищен');
  };

  const handleBackClick = () => {
    navigate(listRoute);
  };

  return (
    <CenteredContainer>
      <StyledHeader>
        {isEditing ? 'Редактирование объявления' : 'Создание объявления'}
      </StyledHeader>
      <StyledForm
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        onValuesChange={handleFormChange}
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
          rules={[
            { required: true, message: 'Пожалуйста, выберите категорию!' },
          ]}
        >
          <Select
            onChange={(value) => setCategory(value)}
            value={category}
          >
            <Option value='Недвижимость'>Недвижимость</Option>
            <Option value='Авто'>Авто</Option>
            <Option value='Услуги'>Услуги</Option>
          </Select>
        </Form.Item>

        {category === 'Недвижимость' && (
          <>
            <Form.Item
              label='Тип недвижимости'
              name='propertyType'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, выберите тип недвижимости!',
                },
              ]}
            >
              <Select>
                <Option value='Квартира'>Квартира</Option>
                <Option value='Дом'>Дом</Option>
                <Option value='Коттедж'>Коттедж</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='Площадь (кв. м)'
              name='area'
              rules={[
                { required: true, message: 'Пожалуйста, введите площадь!' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label='Количество комнат'
              name='rooms'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите количество комнат!',
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label='Цена'
              name='price'
              rules={[{ required: true, message: 'Пожалуйста, введите цену!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </>
        )}

        {category === 'Авто' && (
          <>
            <Form.Item
              label='Марка'
              name='brand'
              rules={[
                { required: true, message: 'Пожалуйста, выберите марку!' },
              ]}
            >
              <Select>
                <Option value='Toyota'>Toyota</Option>
                <Option value='Honda'>Honda</Option>
                <Option value='Ford'>Ford</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='Модель'
              name='model'
              rules={[
                { required: true, message: 'Пожалуйста, введите модель!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Год выпуска'
              name='year'
              rules={[
                { required: true, message: 'Пожалуйста, введите год выпуска!' },
              ]}
            >
              <InputNumber
                min={1900}
                max={new Date().getFullYear()}
              />
            </Form.Item>

            <Form.Item
              label='Пробег (км)'
              name='mileage'
            >
              <InputNumber min={0} />
            </Form.Item>
          </>
        )}

        {category === 'Услуги' && (
          <>
            <Form.Item
              label='Тип услуги'
              name='serviceType'
              rules={[
                { required: true, message: 'Пожалуйста, выберите тип услуги!' },
              ]}
            >
              <Select>
                <Option value='Ремонт'>Ремонт</Option>
                <Option value='Уборка'>Уборка</Option>
                <Option value='Доставка'>Доставка</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='Опыт работы (лет)'
              name='experience'
              rules={[
                { required: true, message: 'Пожалуйста, введите опыт работы!' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label='Стоимость'
              name='cost'
              rules={[
                { required: true, message: 'Пожалуйста, введите стоимость!' },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label='График работы'
              name='workSchedule'
            >
              <Input />
            </Form.Item>
          </>
        )}

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
      </StyledForm>
      <Modal
        open={isSuccessModalOpen}
        footer={null}
        closable={false}
      >
        <p>Ваш пост успешно {isEditing ? 'обновлен' : 'добавлен'}!</p>
      </Modal>
    </CenteredContainer>
  );
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const StyledHeader = styled(Title)`
  text-align: center;
`;

const StyledForm = styled(Form)<FormProps<Post>>`
  width: 80%;
  max-width: 800px;
`;

const StyledBackButton = styled(Button)`
  margin-bottom: 20px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;
