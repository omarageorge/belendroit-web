// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB_-e9s0CfLJwrjYvpjo2wjixEysh3yEOk',
  authDomain: 'belendroit-3f143.firebaseapp.com',
  projectId: 'belendroit-3f143',
  storageBucket: 'belendroit-3f143.appspot.com',
  messagingSenderId: '35299489032',
  appId: '1:35299489032:web:19f2f396569d72f238e8bd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage };
