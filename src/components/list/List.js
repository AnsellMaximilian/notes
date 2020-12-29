import React, {useState, useEffect} from 'react'

import styles from './list.module.scss';

export default function List({notes, scroll, openForm, openDetail, remove}) {
    // Search filter
    const [isSearchOpen, setisSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [filteredNotes, setFilteredNotes] = useState([]);

    // Initialize filtered notes (with all notes)
    useEffect(() => {
        setFilteredNotes(notes)
    }, [notes]);

    // Filter with search term
    useEffect(() => {
        setFilteredNotes(filteredNotes => {
            if(!searchTerm) return notes;
            return notes.filter(note => note.title.includes(searchTerm));
        })
    }, [searchTerm])

    // Reset filter (ALL)
    const resetFilter = () => {
        setSearchTerm('');
    }

    const noteItems = filteredNotes.map(note => {
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
                    <div className={styles.filter__item} onClick={resetFilter}>All</div>
                    <div className={styles.filter__item}>Tags</div>
                    <div className={styles.search}>
                        <input type="text" 
                            id="search-input"
                            className={isSearchOpen ? styles.search__open : ""} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onBlur={() => setisSearchOpen(false)}
                        />
                        <div className={`${styles.filter__item} ${searchTerm ? styles['filter__item--on'] : ""}`} 
                            onClick={() => {
                                setisSearchOpen(state => {
                                    // if clicked from a closed state, put focus on input
                                    if(!state) {
                                        const searchInput = document.getElementById('search-input');
                                        searchInput.focus();
                                        searchInput.setSelectionRange(0, searchInput.value.length)
                                    }
                                    return !state;
                                });
                            }}
                        >
                            Search <i className="fas fa-search"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.filter__item} onClick={openForm}>New <i className="fas fa-plus"></i></div>
            </div>
            <div className={styles.notes} style={scroll > 60 ? {marginTop: '60px'} : {}}>
                {noteItems}
            </div>
        </div>
    )
}
