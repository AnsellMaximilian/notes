import React, {useState} from 'react'

import styles from './form.module.scss';

export default function Form({close, add, tags, user}) {
    const [isTitleInputOpen, setIsTitleInputOpen] = useState(false);
    const [isDescriptionInputOpen, setIsDescriptionInputOpen] = useState(false);
    const [isTagsInputOpen, setIsTagsInputOpen] = useState(false)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [noteTags, setNoteTags] = useState([]);

    const handleChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value);
        }else{
            setDescription(e.target.value);
        }
    }

    const closeAndSave = () => {
        if(title && description) add({title, description, tags: noteTags, user: user.uid});
        close();
    }

    return (
        <div className={styles.obscurer} onClick={closeAndSave}>
            <div className={styles.form} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header} onClick={() => setIsTitleInputOpen(true)}>
                    {
                        isTitleInputOpen ? 
                            <textarea 
                                autoFocus={true} 
                                onBlur={() => setIsTitleInputOpen(false)}
                                className={styles.input}
                                value={title}
                                onChange={handleChange}
                                name="title"
                            ></textarea> 
                            : <h1>{title || "Insert Title"}</h1>
                    }
                    <button className={`fas fa-times ${styles.close}`} onClick={closeAndSave}></button>
                </div>
                
                <div className={styles.description} onClick={() => setIsDescriptionInputOpen(true)}>
                    {
                        isDescriptionInputOpen ? 
                            <textarea 
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
                    <button className={`fas fa-trash ${styles.delete}`}></button>
                </div>
            </div>
        </div>
    )
}
