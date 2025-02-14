import {
  PostCardContainer,
  PostCardContainerProps,
} from '../PostCardContainter';
import { render, screen } from '@testing-library/react';

describe('PostCardContainer component', () => {
  test('Should render correct', () => {
    const props: PostCardContainerProps = {
      post: {
        id: '1',
        name: 'Toyota Camry',
        description: 'Надежный автомобиль',
        location: 'Москва',
        type: 'Авто',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: 15000,
      },
    };
    render(<PostCardContainer {...props} />);

    const name = screen.getByText(/Toyota Camry/);
    const description = screen.getByText(/Надежный автомобиль/);
    const location = screen.getByText(/Москва/);
    const type = screen.getByText(/Авто/);
    const brand = screen.getByText(/Toyota/);
    const model = screen.getByText(/Camry/);
    const year = screen.getByText(/2020/);
    const mileage = screen.getByText(/15000/);

    expect(name).toBeDefined();
    expect(description).toBeDefined();
    expect(location).toBeDefined();
    expect(type).toBeDefined();
    expect(brand).toBeDefined();
    expect(model).toBeDefined();
    expect(year).toBeDefined();
    expect(mileage).toBeDefined();
  });

  test('To match snapshot', () => {
    const props: PostCardContainerProps = {
      post: {
        id: '1',
        name: 'Toyota Camry',
        description: 'Надежный автомобиль',
        location: 'Москва',
        type: 'Авто',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: 15000,
      },
    };

    const { container } = render(<PostCardContainer {...props} />);

    expect(container).toMatchSnapshot();
  });
});
