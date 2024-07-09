import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';
import { ERRORS } from '@/utils/Utils';
import './Form.module.scss';

describe('Form component', () => {
    const mockExecuteFunction = jest.fn();

    const mockFields = [
        { label: 'ID', id: 'id', name: 'id', type: 'text', inputType: 'input' },
        { label: 'Nombre', id: 'name', name: 'name', type: 'text', inputType: 'input' },
        { label: 'Descripción', id: 'description', name: 'description', type: 'text', inputType: 'input' },
        { label: 'Logo', id: 'logo', name: 'logo', type: 'text', inputType: 'input' },
        { label: 'Fecha de Liberación', id: 'date_release', name: 'date_release', type: 'date', inputType: 'input', minDate: '2024-01-01' },
        { label: 'Fecha Revisión', id: 'date_revision', name: 'date_revision', type: 'date', inputType: 'input', disabled: true, maxDate: '2025-01-01' },
    ];

    test('renders form correctly with fields', async () => {
        const { getByLabelText, getByText } = render(
            <Form
                title="Formulario de registro"
                formState={{
                    values: {
                        id: { value: '', error: '' },
                        name: { value: '', error: '' },
                        description: { value: '', error: '' },
                        logo: { value: '', error: '' },
                        date_release: { value: '2024-01-01', error: '' },
                        date_revision: { value: '', error: '' }
                    },
                    handleChange: jest.fn(),
                    handleSubmit: jest.fn(),
                    resetForm: jest.fn(),
                    isValid: true,
                    setValues: jest.fn()
                }}
                fields={mockFields}
                executeFunction={mockExecuteFunction}
                mainButtonName="Enviar"
            />
        );

        const nameInput = getByLabelText('Nombre') as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'Product 1' } });

        const submitButton = getByText('Enviar');
        userEvent.click(submitButton);
        await waitFor(() => {
            expect(mockExecuteFunction).toHaveBeenCalledTimes(1);
        });
    });

    test('renders form correctly with fields', async () => {
        const { getByLabelText, getByText } = render(
            <Form
                title="Formulario de registro"
                formState={{
                    values: {
                        id: { value: '', error: '' },
                        name: { value: '', error: '' },
                        description: { value: '', error: '' },
                        logo: { value: '', error: '' },
                        date_release: { value: '2024-01-01', error: ERRORS['date_release'] },
                        date_revision: { value: '', error: '' }
                    },
                    handleChange: jest.fn(),
                    handleSubmit: jest.fn(),
                    resetForm: jest.fn(),
                    isValid: true,
                    setValues: jest.fn()
                }}
                fields={mockFields}
                executeFunction={mockExecuteFunction}
                mainButtonName="Enviar"
            />
        );

        const nameInput = getByLabelText('Nombre') as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'Product 1' } });

        const submitButton = getByText('Enviar');
        userEvent.click(submitButton);
        await waitFor(() => {
            expect(mockExecuteFunction).toHaveBeenCalledTimes(1);
        });
    });


    test('renders form correctly with fields date_release error', async () => {
        const { getByLabelText, getByText } = render(
            <Form
                title="Formulario de registro"
                formState={{
                    values: {
                        id: { value: '', error: '' },
                        name: { value: '', error: '' },
                        description: { value: '', error: '' },
                        logo: { value: '', error: '' },
                        date_release: { value: '2024-01-01', error: ERRORS['date_release'] },
                        date_revision: { value: '', error: '' }
                    },
                    handleChange: jest.fn(),
                    handleSubmit: jest.fn(),
                    resetForm: jest.fn(),
                    isValid: true,
                    setValues: jest.fn()
                }}
                fields={mockFields}
                executeFunction={mockExecuteFunction}
                mainButtonName="Enviar"
            />
        );

        const nameInput = getByLabelText('Nombre') as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'Product 1' } });

        const submitButton = getByText('Enviar');
        userEvent.click(submitButton);
        await waitFor(() => {
            expect(mockExecuteFunction).toHaveBeenCalledTimes(1);
        });
    });

    test('resets form on "Reiniciar" button click', async () => {
        const { getByText } = render(
            <Form
                title="Formulario de registro"
                formState={{
                    values: {
                        id: { value: '', error: '' },
                        name: { value: '', error: '' },
                        description: { value: '', error: '' },
                        logo: { value: '', error: '' },
                        date_release: { value: '2024-01-01', error: '' },
                        date_revision: { value: '', error: '' }
                    },
                    handleChange: jest.fn(),
                    handleSubmit: jest.fn(),
                    resetForm: jest.fn(),
                    isValid: true,
                    setValues: jest.fn()
                }}
                fields={mockFields}
                executeFunction={mockExecuteFunction}
                mainButtonName="Enviar"
            />
        );

        const resetButton = getByText('Reiniciar');
        userEvent.click(resetButton);
        await waitFor(() => {
            expect(mockExecuteFunction).toHaveBeenCalled();
        });
    });
});

