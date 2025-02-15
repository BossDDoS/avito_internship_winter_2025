import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button, message } from 'antd';
import { Post } from '../models/types';
import { useAddPostMutation } from '../models/api';
import { useNavigate } from 'react-router-dom';
import { config } from 'pages/config';

const { Option } = Select;

export function PostCreateContainer() {
  const navigate = useNavigate();
  const [form] = Form.useForm<Post>();
  const [category, setCategory] = useState<string>('');
  const [addPost] = useAddPostMutation();

  const handleSubmit = async (values: Post) => {
    try {
      await addPost(values).unwrap();
      message.success('Объявление успешно создано!');
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit the form:', error);
      message.error('Ошибка при создании объявления');
    }
  };

  const listRoute =
    config.find((route) => route.key === 'list')?.path || '/list';

  const handleBackClick = () => {
    navigate(listRoute);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSubmit}
    >
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
            rules={[{ required: true, message: 'Пожалуйста, выберите марку!' }]}
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
            rules={[{ required: true, message: 'Пожалуйста, введите модель!' }]}
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

      <Button
        type='primary'
        htmlType='submit'
      >
        Создать объявление
      </Button>
      <Button
        type='primary'
        onClick={handleBackClick}
      >
        К объявлениям
      </Button>
    </Form>
  );
}
