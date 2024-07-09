import React from 'react';
import style from './Dropdown.module.scss';

interface DropdownProps {
    options: string[];
    isOpen: boolean;
    onClickOption: (option: string) => void;
    onToggle: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, isOpen, onClickOption, onToggle }) => {

    const handleOptionClick = (option: string) => {
        onClickOption(option);
        onToggle();
    };

    return (
        <div className={style.dropdown}
        >
            <div
                className={`${style.overlay}  ${isOpen ? style.active : ''}`}
                onClick={onToggle}
                aria-hidden={!isOpen}
            ></div>
            <button
                className={style.dropdownToggle}
                onClick={onToggle}
                title='Acciones'
                aria-expanded={isOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24">
                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
            </button>

            <div className={`${style.optionMenu} ${isOpen ? style.active : ''}`}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        data-testid="option"
                        onClick={() => handleOptionClick(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
