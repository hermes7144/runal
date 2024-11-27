import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getMessaging, onMessage } from 'firebase/messaging';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const messaging = getMessaging(app);

export { messaging, db };
export default app;


onMessage(messaging, (payload) => {
  console.log("포어그라운드 메시지 수신: ", payload);

  const notificationTitle = payload.notification?.title || "알림 제목 없음";
  const notificationBody = payload.notification?.body || "알림 내용 없음";

  new Notification(notificationTitle, {
    body: notificationBody,
  });
});