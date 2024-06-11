import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios
import SignUpForm from './SignUpForm';

jest.mock('axios');

describe('SignUpForm component', () => {
  test('renders sign up form correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignUpForm />);
    
    // Assert input fields and button are rendered
    expect(getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Create Account')).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', async () => {
    const { getByText } = render(<SignUpForm />);
    
    // Simulate form submission without filling any fields
    fireEvent.click(getByText('Create Account'));

    // Assert validation error messages are displayed
    await waitFor(() => {
      expect(getByText('Full Name is required')).toBeInTheDocument();
      expect(getByText('Email is required')).toBeInTheDocument();
      expect(getByText('Password is required')).toBeInTheDocument();
      expect(getByText('Confirm Password is required')).toBeInTheDocument();
    });
  });

  test('displays error message on passwords mismatch', async () => {
    const { getByText, getByPlaceholderText } = render(<SignUpForm />);
    
    // Fill in form fields
    fireEvent.change(getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });

    // Simulate form submission
    fireEvent.click(getByText('Create Account'));

    // Assert error message for passwords mismatch is displayed
    await waitFor(() => {
      expect(getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  test('submits sign up form and redirects on successful registration', async () => {
    const mockResponse = {
      data: {
        message: 'Account created successfully'
      }
    };

    axios.post.mockResolvedValueOnce(mockResponse); // Mock successful registration response

    const { getByPlaceholderText, getByText } = render(<SignUpForm />);
    
    // Fill in form fields
    fireEvent.change(getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(getByText('Create Account'));

    // Assert that axios.post was called with correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/SignUpForm`, {
        fullname: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        confirm_password: 'password123'
      });
    });

    // Assert that the user is redirected after successful registration
    expect(window.location.pathname).toBe('/login');
  });

  test('displays error message on failed registration', async () => {
    const errorMessage = 'Email already exists';
    axios.post.mockRejectedValueOnce(new Error(errorMessage)); // Mock failed registration response

    const { getByPlaceholderText, getByText } = render(<SignUpForm />);
    
    // Fill in form fields
    fireEvent.change(getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(getByText('Create Account'));

    // Assert error message is displayed
    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
