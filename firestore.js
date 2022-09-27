// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { firestore } from 'firebase';
import 'firebase/compat/firestore';
import { getFirestore } from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =({
  apiKey: "AIzaSyB9HNIGEqUhr-uhrUHBAQYaIvGD_RSThcQ",
  authDomain: "ossainapp-52cf0.firebaseapp.com",
  projectId: "ossainapp-52cf0",
  storageBucket: "ossainapp-52cf0.appspot.com",
  messagingSenderId: "351470068640",
  appId: "1:351470068640:web:82b8e91b4fb0683496fac5"
});

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

export { db }; 
