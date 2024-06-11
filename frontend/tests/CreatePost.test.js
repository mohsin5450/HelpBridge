import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import CreatePost from '../src/components/organizations/CreatePost';

jest.mock('axios');

describe('CreatePost Component', () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      id: '123',
      name: 'Test Organization',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(mockLocation);
  });

  test('renders CreatePost form correctly', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount Collected/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    axios.post.mockResolvedValue({ data: { success: 'Post created' } });

    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Post' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/Target Amount/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Amount Collected/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Picture/i), {
      target: {
        files: [new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })],
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/posts/createpost`,
        expect.any(FormData)
      );
      expect(mockNavigate).toHaveBeenCalledWith('/orgHome', {
        state: { id: '123', name: 'Test Organization' },
      });
    });
  });

  test('handles form submission with missing fields', async () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Target Amount/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Amount Collected/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/please fill all input field/i)).toBeInTheDocument();
    });
  });

  test('handles form submission failure', async () => {
    axios.post.mockRejectedValue(new Error('Failed to create post'));

    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Post' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/Target Amount/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Amount Collected/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Picture/i), {
      target: {
        files: [new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })],
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/posts/createpost`,
        expect.any(FormData)
      );
      expect(screen.getByText(/not post the data/i)).toBeInTheDocument();
    });
  });
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import CreatePost from '../components/CreatePost';

jest.mock('axios');

describe('CreatePost Component', () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      id: '123',
      name: 'Test Organization',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    jest.spyOn(require('react-router-dom'), 'useLocation').mockReturnValue(mockLocation);
  });

  test('renders CreatePost form correctly', () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount Collected/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    axios.post.mockResolvedValue({ data: { success: 'Post created' } });

    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Post' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/Target Amount/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Amount Collected/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Picture/i), {
      target: {
        files: [new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })],
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/posts/createpost`,
        expect.any(FormData)
      );
      expect(mockNavigate).toHaveBeenCalledWith('/orgHome', {
        state: { id: '123', name: 'Test Organization' },
      });
    });
  });

  test('handles form submission with missing fields', async () => {
    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Target Amount/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Amount Collected/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/please fill all input field/i)).toBeInTheDocument();
    });
  });

  test('handles form submission failure', async () => {
    axios.post.mockRejectedValue(new Error('Failed to create post'));

    render(
      <BrowserRouter>
        <CreatePost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Post' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2021-01-01' } });
    fireEvent.change(screen.getByLabelText(/Target Amount/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Amount Collected/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Picture/i), {
      target: {
        files: [new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })],
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/posts/createpost`,
        expect.any(FormData)
      );
      expect(screen.getByText(/not post the data/i)).toBeInTheDocument();
    });
  });
});
