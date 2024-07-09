import { fireEvent, render } from '@testing-library/react';
import Header from './Header';
import './Header.module.scss';
import { BrowserRouter } from 'react-router-dom';

describe('Header component', () => {
    test('renders header correctly', () => {
        const { getByText, getByRole } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>);

        const logoText = getByText('BANCO');
        expect(logoText).toBeInTheDocument();

        const logoLink = getByRole('link');
        expect(logoLink).toBeInTheDocument();

        fireEvent.click(logoLink);
        expect(window.location.pathname).toBe('/');
    });

    test('renders header with custom className', () => {
        const { container } = render(
            <BrowserRouter>
                <Header className="custom-class" />
            </BrowserRouter>);

        const headerElement = container.firstChild as HTMLElement;
        expect(headerElement).toHaveClass('custom-class');
    });
});

