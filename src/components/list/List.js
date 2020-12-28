import React from 'react'

import styles from './list.module.scss';

export default function List({notes, scroll, openForm, openDetail, remove}) {

    const noteItems = notes.map(note => {
        return (
            <div className={styles.note} onClick={() => openDetail(note)}>
                <h2>{note.title}</h2>
                <button className={`fas fa-trash ${styles.delete}`} onClick={(e) => {
                    e.stopPropagation();
                    remove(note.id);
                }}></button>
            </div>
        )
    })

    return (
        <div className={styles.list}>
            <div className={`${styles.menu} ${scroll > 60 ? styles['menu-fixed'] : ""}`}>
                <div className={styles.filter}>
                    <div>All</div>
                    <div>Tags</div>
                    <div>Search <i className="fas fa-search"></i></div>
                </div>
                <div className={styles.new} onClick={openForm}>New <i className="fas fa-plus"></i></div>
            </div>
            <div className={styles.notes} style={scroll > 60 ? {marginTop: '60px'} : {}}>
                {noteItems}
            </div>
        </div>
    )
}
