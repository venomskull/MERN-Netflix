// import firebase from 'firebase';
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCsKEP0GIlrK7hE6SR-2Phbpf1lxfPLvQ0",
    authDomain: "netflix-8a8fc.firebaseapp.com",
    projectId: "netflix-8a8fc",
    storageBucket: "netflix-8a8fc.appspot.com",
    messagingSenderId: "977203860392",
    appId: "1:977203860392:web:5df944f449d00d22d6839d",
    measurementId: "G-DR37MB495F"
};

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
// export default storage;

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
