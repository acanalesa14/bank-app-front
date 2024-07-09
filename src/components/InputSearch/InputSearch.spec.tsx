import { fireEvent, render } from '@testing-library/react';
import InputSearch from './InputSearch';

describe('InputSearch component', () => {
    test('renders InputSearch component correctly', () => {
        const mockSetSearchValue = jest.fn();

        const { getByPlaceholderText } = render(
            <InputSearch searchValue="" setSearchValue={mockSetSearchValue} />
        );

        const inputElement = getByPlaceholderText('Buscar...');
        expect(inputElement).toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(mockSetSearchValue).toHaveBeenCalledWith('test');
    });
});

