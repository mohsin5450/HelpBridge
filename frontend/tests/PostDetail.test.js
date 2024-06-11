import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import { MemoryRouter, Route } from 'react-router-dom';
import PostDetails from './PostDetails';

jest.mock('axios');

describe('PostDetails component', () => {
  test('renders post details correctly', async () => {
   
    const mockPost = {
      post_id: 1,
      picture: 'campaign1.jpg',
      title: 'Campaign 1',
      description: 'Description 1',
      target_money: 200,
      collected_money: 100,
    };

    
    axios.get.mockResolvedValueOnce({ data: [mockPost] });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Route path="/post/:id">
          <PostDetails />
        </Route>
      </MemoryRouter>
    );

    
    await waitFor(() => {
      
      expect(getByText('Campaign 1')).toBeInTheDocument();
      expect(getByText('Description 1')).toBeInTheDocument();
      expect(getByText('Target money: 200')).toBeInTheDocument();
      expect(getByText('Collected money: 100')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Amount')).toBeInTheDocument();
    });
  });

  test('handles donation', async () => {
   
    const mockPost = {
      post_id: 1,
      picture: 'campaign1.jpg',
      title: 'Campaign 1',
      description: 'Description 1',
      target_money: 200,
      collected_money: 100,
    };

    
    axios.get.mockResolvedValueOnce({ data: [mockPost] });

    
    axios.put.mockResolvedValueOnce({ data: 'Donation successful' });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Route path="/post/:id">
          <PostDetails />
        </Route>
      </MemoryRouter>
    );

    
    await waitFor(() => {
      
      fireEvent.change(getByPlaceholderText('Enter Amount'), { target: { value: '50' } });

      
      fireEvent.click(getByText('Donate'));

      
      expect(getByText('Please enter the OTP sent to your registered mobile number')).toBeInTheDocument();
    });
  });

  test('handles error when fetching post details', async () => {
    
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch post details'));

    const { getByText } = render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Route path="/post/:id">
          <PostDetails />
        </Route>
      </MemoryRouter>
    );

   
    await waitFor(() => {
      
      expect(getByText('No post found')).toBeInTheDocument();
    });
  });
});
