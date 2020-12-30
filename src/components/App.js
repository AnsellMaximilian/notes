import React, {useState, useEffect} from 'react'

import Header from './header/Header';
import List from './list/List';
import Form from './form/Form';
import Detail from './detail/Detail';
import Auth from './auth/Auth';

import {db, auth} from '../utils/firebase';

export default function App() {
    const [scroll, setScroll] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailItem, setDetailItem] = useState(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [user, setUser] = useState(null);

    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);

    // COMPONENT DID MOUNT
    useEffect(async () => {
        document.addEventListener('scroll', () => {
            setScroll(window.scrollY);
        })
        
        db.collection('tags').onSnapshot(snapshot => {
            const tags = snapshot.docs.map(doc => {
                const tag = doc.data();
                tag.id = doc.id;
                return tag;
            });
            setTags(tags);
        })

        auth.onAuthStateChanged(user => setUser(user));
    }, [])

    // Listen for snapshot when user gets logged in
    useEffect(() => {
        if(user){
            const listener = db.collection('notes').where('user', '==', user.uid).onSnapshot(snapshot => {
                const notes = snapshot.docs.map(doc => {
                    const note = doc.data();
                    note.id = doc.id;
                    return note;
                });
                setNotes(notes);
            }, error => listener()) //Unsubscribing if there's an error
        }else {setNotes([])}
    }, [user])

    // Form
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    // Detail
    const openDetail = (note) => {
        setDetailItem(note);
        setIsDetailOpen(true);
    }
    const closeDetail = () => setIsDetailOpen(false);

    // Auth
    const closeAuth = () => setIsAuthOpen(false);

    // Add
    const add = (noteObj) => {
        db.collection('notes').add(noteObj).then(console.log('success'));
    }

    // Update
    const update = (noteObj, id) => {
        db.collection('notes').doc(id).update(noteObj).then(console.log('updated successfully'));
    }

    // Delete 
    const remove = (id) => {
        db.collection('notes').doc(id).delete();
    }

    // Sign in
    const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
    // Sign Up
    const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    // Log out
    const logout = () => auth.signOut();

    return (
        <div className="app">
            <Header openAuth={setIsAuthOpen} logout={logout} user={user}/>
            <List 
                notes={notes}
                tags={tags}
                scroll={scroll} 
                openForm={openForm} 
                openDetail={openDetail} 
                remove={remove}
            />
            {isAuthOpen ? <Auth type={isAuthOpen} signIn={signIn} signUp={signUp} close={closeAuth}/> : null}
            {isFormOpen ? <Form close={closeForm} add={add} tags={tags} user={user}/> : null}
            {isDetailOpen ? <Detail note={detailItem} tags={tags} close={closeDetail} remove={remove} update={update}/> : null}
        </div>
    )
}
