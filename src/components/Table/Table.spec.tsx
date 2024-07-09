import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Table, { ItemProps, TableProps } from './Table';
import './Table.module.scss';

const mockHeaders: string[] = ['Logo', 'Nombre del producto', 'Descripción', 'Fecha de liberación', 'Fecha de reestructuración', ''];
const mockItems: ItemProps[] = [
    {
        id: '1',
        name: 'Product 1',
        description: 'Description of Product 1',
        logo: 'https://example.com/logo1.png',
        date_release: '2024-01-01',
        date_revision: '2024-12-31',
    },
    {
        id: '2',
        name: 'Product 2',
        description: 'Description of Product 2',
        logo: 'https://example.com/logo2.png',
        date_release: '2023-01-01',
        date_revision: '2023-12-31',
    },
];

const mockDeleteProduct = jest.fn();
const mockSetPageResults = jest.fn();
const mockNavigateTo = jest.fn();

const mockProps: TableProps = {
    headers: mockHeaders,
    items: mockItems,
    deleteProduct: mockDeleteProduct,
    pageResults: 5,
    setPageResults: mockSetPageResults,
    navigateTo: mockNavigateTo,
};

describe('Table component', () => {
    test('renders table with products', () => {
        const { getByText, getAllByRole } = render(<Table {...mockProps} />);

        mockItems.forEach(item => {
            expect(getByText(item.name)).toBeInTheDocument();
            expect(getByText(item.description)).toBeInTheDocument();
            expect(getAllByRole('img', { name: item.name })).toHaveLength(1);
        });
    });

    test('opens and closes delete modal', async () => {
        const { getAllByText } = render(<Table {...mockProps} />);

        fireEvent.click(getAllByText('Eliminar')[0]);
        const modal = screen.getAllByTestId(`modal-description`)[0];
        expect(modal).toBeInTheDocument();

        fireEvent.click(screen.getAllByText('Cancelar')[0]);
        await waitFor(() => {
            expect(modal).not.toBeInTheDocument();
        });
    });

    test('handles product deletion', async () => {
        const { getAllByText, queryByRole } = render(<Table {...mockProps} />);

        fireEvent.click(getAllByText('Eliminar')[0]);

        fireEvent.click(getAllByText('Confirmar')[0]);

        await waitFor(() => {
            expect(mockDeleteProduct).toHaveBeenCalledWith(mockItems[0].id);
        });

        expect(queryByRole('dialog')).toBeNull();
    });



    test('handles page results change', async () => {
        const { getByTitle } = render(<Table {...mockProps} />);

        fireEvent.change(getByTitle('Resultados'), { target: { value: '10' } });

        await waitFor(() => {
            expect(mockSetPageResults).toHaveBeenCalledWith(10);
        });
    });

    test('renders empty table message', () => {
        const { getByAltText, getByText } = render(<Table {...mockProps} items={[]} />);

        expect(getByAltText('')).toBeInTheDocument();
        expect(getByText('Aún no hay productos registrado.')).toBeInTheDocument();
    });

    test('opens and closes delete modal', async () => {
        const { getAllByTestId } = render(<Table {...mockProps} />);

        const deleteButton = getAllByTestId('option')[1];
        fireEvent.click(deleteButton);

    });

    test('renders table with products data and handles interactions', async () => {
        render(<Table {...mockProps} />);

        await waitFor(() => {
            mockItems.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
                expect(screen.getByText(item.description)).toBeInTheDocument();
            });
        });

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Description of Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Product 2')).toBeInTheDocument();

        const dropdownToggleButton = screen.getAllByTitle("Acciones")[0];

        fireEvent.click(dropdownToggleButton);
        fireEvent.click(screen.getAllByText('Eliminar')[0]);

        await waitFor(() => {
            expect(screen.getByText(`¿Estas seguro de eliminar el producto ${mockItems[0].name}?`)).toBeInTheDocument();
        });
        const cancelButton = screen.getByText('Cancelar');
        fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText(`¿Estas seguro de eliminar el producto ${mockItems[0].name}?`)).not.toBeInTheDocument();
        });

        fireEvent.click(dropdownToggleButton);
        fireEvent.click(screen.getAllByText('Eliminar')[0]);

        const confirmButton = screen.getAllByText('Confirmar')[0];
        fireEvent.click(confirmButton);

        expect(mockDeleteProduct).toHaveBeenCalledWith(mockItems[0].id);
    });
});
