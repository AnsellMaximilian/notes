import React from 'react'

import styles from './header.module.scss';

export default function Header({openAuth, logout, user}) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>NOTES APP</h1>
            <ul className={styles['auth-links']}>
                {
                    user ?
                    <li onClick={logout}>Log Out</li>
                    :
                    <>
                        <li onClick={() => openAuth('signIn')}>Sign In</li>
                        <li onClick={() => openAuth('signUp')}>Sign Up</li>
                    </>
                }
            </ul>
        </header>
    )
}
