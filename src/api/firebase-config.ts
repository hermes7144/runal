import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Firebase 인증 서비스 임포트
import 'firebase/compat/firestore'; // Firebase Firestore 서비스 임포트
import 'firebase/compat/messaging'; // Firebase Messaging 서비스 임포트

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging();

export { auth, db, messaging};
export default app;