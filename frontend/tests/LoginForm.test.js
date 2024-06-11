import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios
import LoginForm from '../src/components/organizations/LoginForm';

jest.mock('axios');

describe('LoginForm component', () => {
  test('renders login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    
    // Assert email and password input fields are rendered
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', async () => {
    const { getByText } = render(<LoginForm />);
    
    // Simulate form submission without filling any fields
    fireEvent.click(getByText('Login'));

    // Assert validation error messages are displayed
    await waitFor(() => {
      expect(getByText('Email is required')).toBeInTheDocument();
      expect(getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('submits login form and redirects on successful login', async () => {
    const mockResponse = {
      data: [
        {
          username: 'testUser',
          id: '123456789'
        }
      ]
    };

    axios.post.mockResolvedValueOnce(mockResponse); // Mock successful login response

    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    
    // Fill in email and password fields
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(getByText('Login'));

    // Assert that axios.post was called with correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Assert that the user is redirected after successful login
    expect(window.location.pathname).toBe('/registration');
  });

  test('displays error message on failed login', async () => {
    axios.post.mockRejectedValueOnce(new Error('Unauthorized')); // Mock failed login response

    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    
    // Fill in email and password fields
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(getByText('Login'));

    // Assert that axios.post was called with correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Assert that the error message is displayed
    expect(getByText('Unauthorized')).toBeInTheDocument();
  });
});
