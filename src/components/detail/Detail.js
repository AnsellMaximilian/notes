import React, {useState} from 'react'

import styles from './detail.module.scss';

export default function Detail({note, close, remove}) {

    const removeAndClose = () => {
        close();
        remove(note.id);
    }

    return (
        <div className={styles.obscurer} onClick={close}>
            <div className={styles.detail} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    {note.title}
                    <button className={`fas fa-times ${styles.close}`} onClick={close}></button>
                </div>
                <div className={styles.description}>
                    <p>{note.description}</p>
                </div>
                <div className={styles.tools}>
                    <div className={styles.tags}>
                        {note.tags?.map(tag => <span className={styles.tags__item}>{tag}</span>)}
                        <span className={`fas fa-plus ${styles.tags__item} ${styles.add}`}></span>
                    </div>
                    <button className={`fas fa-trash ${styles.delete}`} onClick={removeAndClose}></button>
                </div>
            </div>
        </div>
    )
}
