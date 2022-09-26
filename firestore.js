// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
require('firebase/firestore')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9HNIGEqUhr-uhrUHBAQYaIvGD_RSThcQ",
  authDomain: "ossainapp-52cf0.firebaseapp.com",
  projectId: "ossainapp-52cf0",
  storageBucket: "ossainapp-52cf0.appspot.com",
  messagingSenderId: "351470068640",
  appId: "1:351470068640:web:82b8e91b4fb0683496fac5"
};

// Initialize Firebase
let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const db = firebase.firestore();

export { db };
