import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const messaging = getMessaging(app);

export { messaging, db };
export default app;

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // 푸시 알림을 클라이언트에 표시하는 코드 작성
  const { title, body, icon } = payload.notification;

  // 브라우저 알림 API를 사용하여 알림을 표시
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: icon,
    });
  }
});