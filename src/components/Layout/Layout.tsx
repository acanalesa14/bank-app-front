import React, { ReactNode } from 'react'
import Header from '../Header/Header'
import style from './Layout.module.scss'

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <Header />
            <div
                data-testid="content-component"
                className={style.mainTable}
            >
                {children}
            </div>
        </>
    )
}

export default Layout