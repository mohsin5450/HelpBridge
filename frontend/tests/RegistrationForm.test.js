import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import { MemoryRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

jest.mock('axios');

describe('RegistrationForm component', () => {
  test('renders registration form correctly', () => {
    const { getByLabelText, getByText } = render(<RegistrationForm />, { wrapper: MemoryRouter });
    
  
    expect(getByLabelText('Organization Name:')).toBeInTheDocument();
    expect(getByLabelText('Director Name:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Phone:')).toBeInTheDocument();
    expect(getByLabelText('Address:')).toBeInTheDocument();
    expect(getByLabelText('Mission:')).toBeInTheDocument();
    expect(getByLabelText('About our company:')).toBeInTheDocument();
    expect(getByLabelText('Website:')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
  });

  test('successfully registers an organization', async () => {
    const { getByLabelText, getByText } = render(<RegistrationForm />, { wrapper: MemoryRouter });

   n
    const formData = {
      organizationName: 'Test Organization',
      directorName: 'Test Director',
      email: 'test@example.com',
      phone: '1234567890',
      address: 'Test Address',
      mission: 'Test Mission',
      description: 'Test Description',
      website: 'http://www.test.org',
    };

    // Fill in form fields
    fireEvent.change(getByLabelText('Organization Name:'), { target: { value: formData.organizationName } });
    fireEvent.change(getByLabelText('Director Name:'), { target: { value: formData.directorName } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: formData.email } });
    fireEvent.change(getByLabelText('Phone:'), { target: { value: formData.phone } });
    fireEvent.change(getByLabelText('Address:'), { target: { value: formData.address } });
    fireEvent.change(getByLabelText('Mission:'), { target: { value: formData.mission } });
    fireEvent.change(getByLabelText('About our company:'), { target: { value: formData.description } });
    fireEvent.change(getByLabelText('Website:'), { target: { value: formData.website } });

   
    const mockResponse = {
      data: {
        id: 1,
        username: 'Test User',
      },
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    
    fireEvent.click(getByText('Register'));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/organization/register`, formData);
    });

    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/orgHome');
    });
  });

  test('displays error message if required fields are not filled', async () => {
    const { getByText } = render(<RegistrationForm />, { wrapper: MemoryRouter });

    
    fireEvent.click(getByText('Register'));

    
    await waitFor(() => {
      expect(getByText('Please fill in all the required fields before submitting the form.')).toBeInTheDocument();
    });

    
    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
    });

    
    await waitFor(() => {
      expect(window.location.pathname).not.toBe('/orgHome');
    });
  });
});
