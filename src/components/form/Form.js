import React, {useState} from 'react'

import styles from './form.module.scss';

export default function Form({close, add}) {
    const [isTitleInputOpen, setIsTitleInputOpen] = useState(false);
    const [isDescriptionInputOpen, setIsDescriptionInputOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value);
        }else{
            setDescription(e.target.value);
        }
    }

    const closeAndSave = () => {
        if(title && description) add({title, description});
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
                        
                        <span className={`fas fa-plus ${styles.tags__item} ${styles.add}`}></span>
                    </div>
                    <button className={`fas fa-trash ${styles.delete}`}></button>
                </div>
            </div>
        </div>
    )
}
