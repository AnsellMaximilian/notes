import React, {useState} from 'react'

import styles from './detail.module.scss';

export default function Detail({note, tags, close, remove, update}) {
    // State for updating note
    const [isTitleInputOpen, setIsTitleInputOpen] = useState(false);
    const [isDescriptionInputOpen, setIsDescriptionInputOpen] = useState(false);
    const [isTagsInputOpen, setIsTagsInputOpen] = useState(false)

    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);

    const [noteTags, setNoteTags] = useState(note.tags || []);

    // When user clicks trash button -- closes and deletes.
    const removeAndClose = () => {
        close();
        remove(note.id);
    }

    const handleChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value);
        }else{
            setDescription(e.target.value);
        }
    }

    const closeAndUpdate = () => {
        if(title && description) update({title, description, tags: noteTags}, note.id);
        close();
    }

    return (
        <div className={styles.obscurer} onClick={closeAndUpdate}>
            <div className={styles.detail} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header} onClick={() => setIsTitleInputOpen(true)}>
                     {
                        isTitleInputOpen ? 
                            <textarea 
                                onFocus={(e) => e.target.setSelectionRange(0, e.target.value.length)}
                                autoFocus={true} 
                                onBlur={() => setIsTitleInputOpen(false)}
                                className={styles.input}
                                value={title}
                                onChange={handleChange}
                                name="title"
                            ></textarea> 
                            : <h1>{title || "Insert Title"}</h1>
                    }
                    <button className={`fas fa-times ${styles.close}`} onClick={closeAndUpdate}></button>
                </div>
                <div className={styles.description} onClick={() => setIsDescriptionInputOpen(true)}>
                    {
                        isDescriptionInputOpen ? 
                            <textarea 
                                onFocus={(e) => e.target.setSelectionRange(0, e.target.value.length)}
                                autoFocus={true} 
                                onBlur={() => setIsDescriptionInputOpen(false)}
                                className={styles.input}
                                value={description}
                                onChange={handleChange}
                                name="description"
                            ></textarea> 
                            : <p>{description || "Insert description"}</p>
                    }
                </div>
                <div className={styles.tools}>
                    <div className={styles.tags}>
                        {noteTags?.map(noteTag => {
                            // Getting the tag name
                            const [tagName] = tags.filter(tag => tag.id === noteTag).map(tag => tag.name);
                            return <span className={styles.tags__item}>{tagName}</span>
                        })}
                        <span className={`fas fa-plus ${styles.tags__item} ${styles.add}`} onClick={() => setIsTagsInputOpen(status => !status)}>
                            {
                                isTagsInputOpen ?
                                <div className={styles['tags-input']} onClick={(e) => e.stopPropagation()} onMouseLeave={() => setIsTagsInputOpen(false)}>
                                    <div className={styles['tags-input__items']}>
                                        {
                                            tags.map(tag => {
                                                return (
                                                    <div key={tag.id} className={styles['tags-input__tag']}>
                                                        <label>
                                                            <input type="checkbox" checked={noteTags?.includes(tag.id)} onChange={(e) => {
                                                                if(e.target.checked){
                                                                    setNoteTags(tags => [...tags, tag.id])
                                                                } else{
                                                                    setNoteTags(tags => tags.filter(filterTag => filterTag !== tag.id));
                                                                } 
                                                            }} />
                                                            {tag.name}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className={styles['tag-input']}>

                                    </div>
                                </div> : null
                            }
                        </span>
                    </div>
                    <button className={`fas fa-trash ${styles.delete}`} onClick={removeAndClose}></button>
                </div>
            </div>
        </div>
    )
}
