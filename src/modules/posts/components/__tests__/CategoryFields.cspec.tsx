import { render, screen } from '@testing-library/react';
import { CategoryFields } from '../CategoryFields';
import { ConfigProvider, Form } from 'antd';

describe('CategoryFields Component', () => {
  test('renders estate fields when category is Недвижимость', () => {
    render(
      <Form>
        <CategoryFields category='Недвижимость' />
      </Form>,
    );

    expect(screen.getByLabelText(/Тип недвижимости/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Площадь/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Количество комнат/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Цена/i)).toBeInTheDocument();
  });

  test('renders auto fields when category is Авто', () => {
    render(
      <Form>
        <CategoryFields category='Авто' />
      </Form>,
    );

    expect(screen.getByLabelText(/Марка/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Модель/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Год выпуска/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пробег/i)).toBeInTheDocument();
  });

  test('renders service fields when category is Услуги', async () => {
    console.log('render');
    render(
      <ConfigProvider>
        <Form>
          <CategoryFields category='Услуги' />
        </Form>
      </ConfigProvider>,
    );

    expect(await screen.findByLabelText(/Тип услуги/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Опыт работы/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Стоимость/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/График работы/i)).toBeInTheDocument();
  });
});
