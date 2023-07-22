// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, serverTimestamp, query, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUZZSe3RYIqIni5CFHRIniKcKb5vKUJ4A",
  authDomain: "lastchance-716c3.firebaseapp.com",
  projectId: "lastchance-716c3",
  storageBucket: "lastchance-716c3.appspot.com",
  messagingSenderId: "502545743284",
  appId: "1:502545743284:web:a679ecab5a4d58c1f606e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage, doc, setDoc, collection, addDoc, getDoc, serverTimestamp, query, onSnapshot };