import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostCardContainer } from '../PostCardContainer';
import { PostCardContainerProps } from '../PostCardContainer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PostCardContainer component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(
      mockNavigate,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test('Should render correct', () => {
    render(
      <MemoryRouter>
        <PostCardContainer {...props} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Toyota Camry/)).toBeInTheDocument();
    expect(screen.getByText(/Москва/)).toBeInTheDocument();
    expect(screen.getByText(/Авто/)).toBeInTheDocument();
  });

  test('Should call navigate when "Открыть" button is clicked', () => {
    render(
      <MemoryRouter>
        <PostCardContainer {...props} />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /Открыть/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/item/1');
  });

  test('To match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <PostCardContainer {...props} />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
