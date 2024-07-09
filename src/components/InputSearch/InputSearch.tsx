import React from 'react'
import style from './InputSearch.module.scss'

interface InputSearchProps {
    className?: string;
    searchValue: any;
    setSearchValue: any;
}

const InputSearch: React.FC<InputSearchProps> = ({ className = "", searchValue, setSearchValue }) => {
    return (
        <div className={`${style.inputSearch} ${className}`}>
            <input
                type="search"
                placeholder='Buscar...'
                value={searchValue}
                onChange={(e) => {
                    const value = e.target.value.toLowerCase();
                    setSearchValue(value);
                }}
            />
        </div>
    )
}

export default InputSearch