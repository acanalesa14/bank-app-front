import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import './Modal.module.scss';

describe('Modal component', () => {
    test('renders modal when isOpen is true', () => {
        const onCloseMock = jest.fn();

        const { getByTestId } = render(
            <Modal 
            isOpen={true} 
            onClose={onCloseMock} 
            data-testid="modal-content"
            className="custom-modal">
                <div>Modal Content</div>
            </Modal>
        );

        const modalElement = getByTestId('modal-content');
        expect(modalElement).toBeInTheDocument();

        const modalContent = getByTestId('modal-content');
        expect(modalContent).toBeInTheDocument();

        const modal = getByTestId('modal-content');
        expect(modal).toHaveClass('custom-modal');

        const overlay = getByTestId('overlay');
        fireEvent.click(overlay);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    test('does not render modal when isOpen is false', () => {
        const onCloseMock = jest.fn();

        const { queryByTestId } = render(
            <Modal isOpen={false} onClose={onCloseMock} data-testid="modal-content" className="custom-modal">
                <div >Modal Content</div>
            </Modal>
        );

        const modalElement = queryByTestId('modal-content');
        expect(modalElement).toBeNull();
    });
});

