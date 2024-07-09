import React from 'react';
import style from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className: string;
    role?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, role }) => {
    if (!isOpen) return null;

    return (
        <div
            role={role}
            data-testid="modal-content"
            className={`${style.modal} ${className}`}>
            <div
                className={style.overlay}
                data-testid="overlay"
                onClick={onClose}></div>
            <div className={style.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
