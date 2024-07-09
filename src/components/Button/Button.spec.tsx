import { fireEvent, render } from '@testing-library/react';
import Button from './Button';
import './Button.module.scss';

describe('Button component', () => {
    test('renders button correctly', () => {
        const { getByText } = render(<Button>Click me</Button>);
        const buttonElement = getByText('Click me');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.tagName).toBe('BUTTON');
    });

    test('calls onClick prop when clicked', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
        const buttonElement = getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test('disables button when disabled prop is true', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button onClick={onClickMock} disabled>Click me</Button>);
        const buttonElement = getByText('Click me') as HTMLButtonElement;
        expect(buttonElement.disabled).toBe(true);
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(0);
    });

    test('applies primary button style', () => {
        const { container } = render(<Button buttonStyle="primary">Primary Button</Button>);
        const buttonElement = container.querySelector('button');
        expect(buttonElement).toHaveClass('bankButton');
        expect(buttonElement).toHaveClass('primary');
    });

    test('applies custom className', () => {
        const { container } = render(<Button className="customClass">Custom Class Button</Button>);
        const buttonElement = container.querySelector('button');
        expect(buttonElement).toHaveClass('bankButton');
        expect(buttonElement).toHaveClass('customClass');
    });
});
