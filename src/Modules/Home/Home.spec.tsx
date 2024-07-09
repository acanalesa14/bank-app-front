import { axiosService } from '@/utils/Utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
        (axiosService as jest.MockedFunction<typeof axiosService>).mockResolvedValue({ data: mockData });

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


    test('deleteProduct deletes a product correctly', async () => {
        (axiosService as jest.MockedFunction<typeof axiosService>).mockResolvedValueOnce({ data: mockData });

        render(<MemoryRouter>
            <Home />
        </MemoryRouter>);

        await waitFor(() => {
            mockData.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
                expect(screen.getByText(item.description)).toBeInTheDocument();
            });
        });

        const mockDeletedResponse = { message: 'Product removed successfully' };
        (axiosService as jest.MockedFunction<typeof axiosService>).mockResolvedValueOnce(mockDeletedResponse);


        const deleteButton = screen.getAllByTestId('option')[1];
        fireEvent.click(deleteButton);

        const confirmButton = screen.getByText('Confirmar');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(axiosService).toHaveBeenCalledWith({
                method: 'delete',
                url: `/bp/products/${mockData[0].id}`,
            });
        });
    });
});
