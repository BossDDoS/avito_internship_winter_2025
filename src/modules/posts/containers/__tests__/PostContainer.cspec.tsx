import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PostContainer } from '../PostContainer';
import { useLazyGetPostQuery, useDeletePostMutation } from '../../models/api';
import { config } from 'pages/config';

jest.mock('../../models/api');

describe('PostContainer', () => {
  const mockTriggerGetPost = jest.fn();
  const mockDeletePost = jest.fn();
  const backPath =
    config.find((route) => route.key === 'itemDetail')?.parentKey || '/';

  beforeEach(() => {
    jest.clearAllMocks();
    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: null, isLoading: false, isError: false },
    ]);
    (useDeletePostMutation as jest.Mock).mockReturnValue([mockDeletePost]);
  });

  test('renders loading state', () => {
    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: null, isLoading: true, isError: false },
    ]);

    render(
      <MemoryRouter>
        <PostContainer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: null, isLoading: false, isError: true },
    ]);

    render(
      <MemoryRouter>
        <PostContainer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/error loading post/i)).toBeInTheDocument();
  });

  test('renders post details correctly', () => {
    const mockPost = {
      id: '1',
      name: 'Toyota Camry',
      location: 'Москва',
      type: 'Авто',
      image: '',
    };

    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: mockPost, isLoading: false, isError: false },
    ]);

    render(
      <MemoryRouter>
        <PostContainer />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument();
    expect(screen.getByText(/Москва/i)).toBeInTheDocument();
    expect(screen.getByText(/Авто/i)).toBeInTheDocument();
  });

  test('opens delete modal when delete button is clicked', async () => {
    const mockPost = {
      id: '1',
      name: 'Toyota Camry',
      location: 'Москва',
      type: 'Авто',
      image: '',
    };

    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: mockPost, isLoading: false, isError: false },
    ]);

    render(
      <MemoryRouter>
        <PostContainer />
      </MemoryRouter>,
    );

    const deleteButton = screen.getByText(/удалить/i);
    fireEvent.click(deleteButton);

    await screen.findByText(/вы уверены/i);
  });

  test('calls delete mutation when delete is confirmed', async () => {
    const mockPost = {
      id: '1',
      name: 'Toyota Camry',
      location: 'Москва',
      type: 'Авто',
      image: '',
    };
    mockDeletePost.mockResolvedValueOnce({});

    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: mockPost, isLoading: false, isError: false },
    ]);

    render(
      <MemoryRouter>
        <PostContainer />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/удалить/i));
    await screen.findByText(/вы уверены/i);

    fireEvent.click(screen.getByText(/да/i));

    await waitFor(() => expect(mockDeletePost).toHaveBeenCalledWith('1'));
  });

  test('navigates back when back button is clicked', async () => {
    const mockPost = {
      id: '1',
      name: 'Toyota Camry',
      location: 'Москва',
      type: 'Авто',
      image: '',
    };

    (useLazyGetPostQuery as jest.Mock).mockReturnValue([
      mockTriggerGetPost,
      { data: mockPost, isLoading: false, isError: false },
    ]);

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route
            path='/post/:slug'
            element={<PostContainer />}
          />
          <Route
            path={backPath}
            element={<div>Back Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/назад/i));

    await screen.findByText(/Back Page/i);
  });
});
