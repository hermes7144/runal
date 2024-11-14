// src/firebase/auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import app from './firebaseConfig';
import { User } from 'firebase/auth';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}