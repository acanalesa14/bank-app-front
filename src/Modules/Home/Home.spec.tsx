import { axiosService } from '@/utils/Utils';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

jest.mock('@/utils/Utils');

describe('Home component', () => {

    const mockData = [
        {
            id: '1',
            name: 'Product 1',
            description: 'Description for Product 1',
            logo: 'https://example.com/logo1.png',
            date_release: '2023-01-01',
            date_revision: '2024-01-01'
        },
        {
            id: '2',
            name: 'Product 2',
            description: 'Description for Product 2',
            logo: 'https://example.com/logo2.png',
            date_release: '2023-02-01',
            date_revision: '2024-02-01'
        }
    ];

    test('renders table with products data and handles interactions', async () => {
        (axiosService as jest.MockedFunction<typeof axiosService>).mockResolvedValue({data: mockData});

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            mockData.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
                expect(screen.getByText(item.description)).toBeInTheDocument();
            });
        });
        expect(axiosService).toHaveBeenCalledWith({ method: 'get', url: '/bp/products' });
    });
});
