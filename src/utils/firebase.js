import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCz8xEjEIW1u4DMGi2EymPh-wbeKPElX4w",
    authDomain: "notes-3c4f2.firebaseapp.com",
    projectId: "notes-3c4f2",
    storageBucket: "notes-3c4f2.appspot.com",
    messagingSenderId: "972708192544",
    appId: "1:972708192544:web:d3714dc4818cd3f141b745"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth}