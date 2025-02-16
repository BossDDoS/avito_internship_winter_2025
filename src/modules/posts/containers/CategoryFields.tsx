import React from 'react';
import { Form, InputNumber, Select, Input } from 'antd';

interface Props {
  category: string;
}

const CategoryFields: React.FC<Props> = ({ category }) => {
  if (category === 'Недвижимость') {
    return (
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
            <Select.Option value='Квартира'>Квартира</Select.Option>
            <Select.Option value='Дом'>Дом</Select.Option>
            <Select.Option value='Коттедж'>Коттедж</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Площадь (кв. м)'
          name='area'
          rules={[{ required: true, message: 'Пожалуйста, введите площадь!' }]}
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
    );
  }

  if (category === 'Авто') {
    return (
      <>
        <Form.Item
          label='Марка'
          name='brand'
          rules={[{ required: true, message: 'Пожалуйста, выберите марку!' }]}
        >
          <Select>
            <Select.Option value='Toyota'>Toyota</Select.Option>
            <Select.Option value='Honda'>Honda</Select.Option>
            <Select.Option value='Ford'>Ford</Select.Option>
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
    );
  }

  if (category === 'Услуги') {
    return (
      <>
        <Form.Item
          label='Тип услуги'
          name='serviceType'
          rules={[
            { required: true, message: 'Пожалуйста, выберите тип услуги!' },
          ]}
        >
          <Select>
            <Select.Option value='Ремонт'>Ремонт</Select.Option>
            <Select.Option value='Уборка'>Уборка</Select.Option>
            <Select.Option value='Доставка'>Доставка</Select.Option>
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
    );
  }

  return null;
};

export default CategoryFields;
