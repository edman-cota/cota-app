import firebase from 'firebase/app';
import 'firebase/auth';
// import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBwpJJZ8Gt0DO0kvL5FujtZaI85iB-oNnQ",
    authDomain: "buxuptechnology.firebaseapp.com",
    databaseURL: "https://buxuptechnology-default-rtdb.firebaseio.com",
    projectId: "buxuptechnology",
    storageBucket: "buxuptechnology.appspot.com",
    messagingSenderId: "755792078362",
    appId: "1:755792078362:web:76669ae66299779dfb93a3",
    measurementId: "G-8N11Y2SCW9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
// var database = firebase.database();

export const auth = firebase.auth();
