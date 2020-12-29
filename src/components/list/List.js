import React, {useState, useEffect} from 'react'

import styles from './list.module.scss';

export default function List({notes, tags, scroll, openForm, openDetail, remove}) {
    // Search filter
    const [isSearchOpen, setisSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Tags filter
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [filterTags, setFilterTags] = useState([]);

    const [filteredNotes, setFilteredNotes] = useState([]);

    // Filter
    useEffect(() => {
        setFilteredNotes(filteredNotes => {
            return notes.filter(note => {
                // if search is empty or tag filter is empty, dont apply respective filter
                const searchFilter = searchTerm ? note.title.includes(searchTerm) : true;
                const tagsFilter = filterTags.length > 0 ? note.tags?.some(tag => filterTags.includes(tag)) : true;
                return searchFilter && tagsFilter;
            })
        })
    }, [searchTerm, filterTags, notes])

    // Reset filter (ALL)
    const resetFilter = () => {
        setSearchTerm('');
        setFilterTags([]);
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

    const tagsItem = tags.map(tag => {
        return (
            <div key={tag.id} className={styles.tag}>
                <label>
                    <input type="checkbox" checked={filterTags.includes(tag.id)} onChange={(e) => {
                        if(e.target.checked){
                            setFilterTags(tags => [...tags, tag.id])
                        } else{
                            setFilterTags(tags => tags.filter(filterTag => filterTag !== tag.id));
                        } 
                    }} />
                    {tag.name}
                </label>
            </div>
        )
    })

    return (
        <div className={styles.list}>
            <div className={`${styles.menu} ${scroll > 60 ? styles['menu-fixed'] : ""}`}>
                <div className={styles.filter}>
                    <div className={styles.filter__item} onClick={resetFilter}>All</div>
                    <div className={`${styles.filter__item} ${filterTags.length > 0 ? styles['filter__item--on'] : ""}`} 
                        onClick={() => setIsTagsOpen(status => !status)}
                        onMouseLeave={() => setIsTagsOpen(false)}
                    >
                        Tags
                        {
                            isTagsOpen ? 
                            <div className={styles.tags} onClick={(e) => e.stopPropagation()}>
                                <div className={styles.tags__items}>
                                    {tagsItem}
                                </div>
                                <div className={styles['tag-input']}>

                                </div>
                            </div> : null
                        }
                    </div>
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
