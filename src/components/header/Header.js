import React from 'react'

import styles from './header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>NOTES APP</h1>
            <ul className={styles['auth-links']}>
                <li>Sign In</li>
                <li>Sign Up</li>
            </ul>
        </header>
    )
}
