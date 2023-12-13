// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBeYg9GjFBSB-S6HzfSSMyZFIjqA5vmzlw',
  authDomain: 'trend-zetapp.firebaseapp.com',
  projectId: 'trend-zetapp',
  storageBucket: 'trend-zetapp.appspot.com',
  messagingSenderId: '194114542266',
  appId: '1:194114542266:web:6fdb49024615ffaaa1c083',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export { app, provider, auth, db, storage };
