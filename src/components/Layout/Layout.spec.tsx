import { render } from '@testing-library/react';
import Layout from './Layout';
import './Layout.module.scss';
import { MemoryRouter } from 'react-router-dom';

describe('Layout component', () => {
    test('renders Layout component correctly', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <Layout>
                    <div data-testid="test-child">Test Child Component</div>
                </Layout>
            </MemoryRouter>
        );

        const childElement = getByTestId('content-component');
        expect(childElement).toBeInTheDocument();
    });
});

