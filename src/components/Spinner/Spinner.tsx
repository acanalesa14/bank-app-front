import React from 'react'
import styles from './Spinner.module.scss'

const Spinner: React.FC = () => {
    return (
        <div
            className={styles.spinner}
            data-testid="spinner-circle"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
            >
                <circle cx={12} cy={20} r={2} />
                <circle cx={12} cy={4} r={2} />
                <circle cx="6.343" cy="17.657" r={2} />
                <circle cx="17.657" cy="6.343" r={2} />
                <circle cx={4} cy={12} r="2.001" />
                <circle cx={20} cy={12} r={2} />
                <circle cx="6.343" cy="6.344" r={2} />
                <circle cx="17.657" cy="17.658" r={2} />
            </svg>
        </div>
    )
}

export default Spinner