import { fireEvent, render } from '@testing-library/react';
import Dropdown from './Dropdown';
import styles from './Dropdown.module.scss';

describe('Dropdown component', () => {
    test('renders dropdown correctly', () => {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const { getByText, getByTitle } = render(<Dropdown options={options} isOpen={false} onClickOption={() => { }} onToggle={() => { }} />);

        const dropdownToggle = getByTitle('Acciones');
        expect(dropdownToggle).toBeInTheDocument();

        fireEvent.click(dropdownToggle);

        options.forEach(option => {
            const optionElement = getByText(option);
            expect(optionElement).toBeInTheDocument();
            fireEvent.click(optionElement);
        });
    });

    test('toggles dropdown menu when button is clicked', () => {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const { getByTitle, getByText } = render(<Dropdown
            options={options}
            isOpen={false}
            onClickOption={() => { }}
            onToggle={() => { }} />);

        const dropdownToggle = getByTitle('Acciones');
        fireEvent.click(dropdownToggle);

        const optionElement = getByText(options[0]);
        
        expect(optionElement).toBeInTheDocument();
    });

    test('calls onClickOption prop when an option is clicked', () => {
        const onClickOptionMock = jest.fn();
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const { getByTitle, getByText } = render(<Dropdown options={options} isOpen={false} onClickOption={onClickOptionMock} onToggle={() => { }} />);

        const dropdownToggle = getByTitle('Acciones');
        fireEvent.click(dropdownToggle);

        const optionElement = getByText(options[1]);
        fireEvent.click(optionElement);

        expect(onClickOptionMock).toHaveBeenCalledTimes(1);
        expect(onClickOptionMock).toHaveBeenCalledWith('Option 2');
    });

    test('applies correct styles when dropdown is open', () => {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        const { getByTitle, container } = render(<Dropdown options={options} isOpen={true} onClickOption={() => { }} onToggle={() => { }} />);

        const dropdownToggle = getByTitle('Acciones');
        fireEvent.click(dropdownToggle);

        const optionMenu = container.querySelector(`.${styles.optionMenu}`);
        expect(optionMenu).toHaveClass(styles.active);
    });
});
