import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFfBYnzyjPHezIX09n_mApDEsCmEEW59w",
  authDomain: "chatapp-557ec.firebaseapp.com",
  projectId: "chatapp-557ec",
  storageBucket: "chatapp-557ec.appspot.com",
  messagingSenderId: "11015991330",
  appId: "1:11015991330:web:ae95b1b1fbe0c1da921a7b",
};
//initalize firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);