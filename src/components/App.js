import React, {useState, useEffect} from 'react'

import Header from './header/Header';
import List from './list/List';
import Form from './form/Form';
import Detail from './detail/Detail';

import {db} from '../utils/firebase';

export default function App() {
    const [scroll, setScroll] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailItem, setDetailItem] = useState(null);

    const [notes, setNotes] = useState([]);

    // COMPONENT DID MOUNT
    useEffect(async () => {
        document.addEventListener('scroll', () => {
            setScroll(window.scrollY);
        })

        db.collection('notes').onSnapshot(snapshot => {
            const notes = snapshot.docs.map(doc => {
                const note = doc.data();
                note.id = doc.id;
                return note;
            });
            setNotes(notes);
        })
    }, [])

    // Form
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    // Detail
    const openDetail = (note) => {
        setDetailItem(note);
        setIsDetailOpen(true);
    }
    const closeDetail = () => setIsDetailOpen(false);

    // Add
    const add = (noteObj) => {
        db.collection('notes').add(noteObj).then(console.log('success'));
    }

    // Update
    const update = (noteObj, id) => {
        db.collection('notes').doc(id).set(noteObj).then(console.log('updated successfully'));
    }

    // Delete 
    const remove = (id) => {
        db.collection('notes').doc(id).delete();
    }

    return (
        <div className="app">
            <Header />
            <List notes={notes} scroll={scroll} openForm={openForm} openDetail={openDetail} remove={remove}/>
            {isFormOpen ? <Form close={closeForm} add={add}/> : null}
            {isDetailOpen ? <Detail note={detailItem} close={closeDetail} remove={remove} update={update}/> : null}
        </div>
    )
}
