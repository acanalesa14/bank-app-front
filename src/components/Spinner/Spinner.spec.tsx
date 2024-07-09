import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
    test('renders without crashing', () => {
        const { getByTestId } = render(<Spinner />);
        const spinnerComponent = getByTestId('spinner-circle');
        expect(spinnerComponent).toBeInTheDocument();
    });
});