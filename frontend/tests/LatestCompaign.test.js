import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import { MemoryRouter } from 'react-router-dom';
import LatestCampaigns from './LatestCampaigns';

jest.mock('axios');

describe('LatestCampaigns component', () => {
  test('renders latest campaigns correctly', async () => {
   
    const mockPosts = [
      {
        post_id: 1,
        picture: 'campaign1.jpg',
        title: 'Campaign 1',
        description: 'Description 1',
        date: '2024-06-01',
        collected_money: 100,
        target_money: 200,
      },
      {
        post_id: 2,
        picture: 'campaign2.jpg',
        title: 'Campaign 2',
        description: 'Description 2',
        date: '2024-06-02',
        collected_money: 150,
        target_money: 300,
      },
    ];

    
    axios.get.mockResolvedValueOnce({ data: mockPosts });

    const { getByText, getByAltText } = render(<LatestCampaigns />, { wrapper: MemoryRouter });

    await waitFor(() => {
  
      expect(getByText('Campaign 1')).toBeInTheDocument();
      expect(getByText('Description 1')).toBeInTheDocument();
      expect(getByText('2024-06-01')).toBeInTheDocument();
      expect(getByText('100 / 200')).toBeInTheDocument();
      expect(getByAltText('Campaign 1')).toBeInTheDocument();

      expect(getByText('Campaign 2')).toBeInTheDocument();
      expect(getByText('Description 2')).toBeInTheDocument();
      expect(getByText('2024-06-02')).toBeInTheDocument();
      expect(getByText('150 / 300')).toBeInTheDocument();
      expect(getByAltText('Campaign 2')).toBeInTheDocument();
    });
  });

  test('handles error when fetching latest campaigns', async () => {
  
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch latest campaigns'));

    const { getByText } = render(<LatestCampaigns />, { wrapper: MemoryRouter });

  
    await waitFor(() => {
      
      expect(getByText('Failed to fetch latest campaigns')).toBeInTheDocument();
    });
  });
});
