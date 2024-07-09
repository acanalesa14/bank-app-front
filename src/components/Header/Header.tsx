import React from 'react'
import style from './Header.module.scss'
import { Link } from 'react-router-dom';

interface ButtonProps {
    className?: string;
}

const Header: React.FC<ButtonProps> = ({ className = '' }) => {

    return (
        <header className={`${style.mainHeader} ${className}`}>
            <Link
                className={style.logo}
                to="/"
                role='link'
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M2 8v4.001h1V18H2v3h16l3 .001V21h1v-3h-1v-5.999h1V8L12 2 2 8zm4 10v-5.999h2V18H6zm5 0v-5.999h2V18h-2zm7 0h-2v-5.999h2V18zM14 8a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 8z"
                    />
                </svg>

                <h2 className={style.logoText}>BANCO</h2>
            </Link>
        </header >
    )
}

export default Header