import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAsXCYBjs8G8fzYJx7dsM2zQG3yJ0Pf_zE",
    authDomain: "poll-manager-1ed4e.firebaseapp.com",
    projectId: "poll-manager-1ed4e",
    storageBucket: "poll-manager-1ed4e.appspot.com",
    messagingSenderId: "1054832917243",
    appId: "1:1054832917243:web:63501be2ec42cec67b8e5e",
    measurementId: "G-MZLGP06WRX"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore();

export default firebase;