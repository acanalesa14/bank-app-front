import React from 'react';
import style from './Button.module.scss'

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    buttonStyle?: "primary" | "default";
    type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children, className = "", buttonStyle = "default", type }) => {
    return (
        <button
            type={type}
            className={`${style.bankButton} ${className} ${buttonStyle && style[buttonStyle]} ${disabled ? style.disabled : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;