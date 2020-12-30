import React, {useState} from 'react'

import styles from './auth.module.scss';

export default function Auth({signIn, signUp, type, close}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if(e.target.name === 'email') { setEmail(e.target.value) }
        else { setPassword(e.target.value) }
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if(type === 'signIn') { signIn(email, password) }
        else { signUp(email, password) }
        close();
    }

    return (
        <div className={styles.obscurer} onClick={close}>
            <div className={styles['form-container']} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h1>{type === 'signIn' ? "SIGN IN" : "SIGN UP"}</h1>
                    <button className={`fas fa-times ${styles.close}`} onClick={close}></button>
                </div>
                
                <form onSubmit={handleSumbit} className={styles.form}>
                    <input type="email" name="email" onChange={handleChange} value={email} placeholder="Enter e-mail"/>
                    <input type="password" name="password" onChange={handleChange} value={password} placeholder="Enter password"/>
                    <button type="submit">{type === 'signIn' ? "SIGN IN" : "SIGN UP"}</button>
                </form>   
            </div>
        </div>
    )
}
