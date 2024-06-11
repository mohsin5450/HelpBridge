import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import { MemoryRouter } from 'react-router-dom';
import UserSelection from './UserSelection';

jest.mock('axios');

describe('UserSelection component', () => {
  test('renders user selection form correctly', () => {
    const { getByText } = render(<UserSelection />, { wrapper: MemoryRouter });
    
   
    expect(getByText('Choose User Type')).toBeInTheDocument();
    expect(getByText('Donor User')).toBeInTheDocument();
    expect(getByText('Charity Collector')).toBeInTheDocument();
  });

  test('redirects to donor page on selecting donor user', async () => {
    const { getByText } = render(<UserSelection />, { wrapper: MemoryRouter });
    
    
    fireEvent.click(getByText('Donor User'));

    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/donor');
    });
  });

  test('redirects to organization home page if user is an organization', async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          org_name: 'Test Organization'
        }
      ]
    };

    axios.post.mockResolvedValueOnce(mockResponse); 

    const { getByText } = render(<UserSelection />, { wrapper: MemoryRouter });
    
    
    fireEvent.click(getByText('Charity Collector'));

   
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/organization/getid`, { userid: undefined });
    });

    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/orgHome');
    });
  });

  test('redirects to registration form if user is not an organization', async () => {
    const mockResponse = {
      data: []
    };

    axios.post.mockResolvedValueOnce(mockResponse); 

    const { getByText } = render(<UserSelection />, { wrapper: MemoryRouter });
    
    
    fireEvent.click(getByText('Charity Collector'));

    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/organization/getid`, { userid: undefined });
    });

    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/RegistrationForm');
    });
  });
});
