import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import app, { messaging } from './firebaseConfig';
import useAuthStore from '../store/authStore';
import { getToken } from 'firebase/messaging';
import { saveUserToken } from './database';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

// 인증 상태 변화 리스너
export const listenToAuthChanges = () => {
  onAuthStateChanged(auth, async (user) => {
    const setUser = useAuthStore.getState().setUser;
    const setLoading = useAuthStore.getState().setLoading;
    
    setLoading(true);

    if (user) {
      setUser(user);
      
      if (window.matchMedia('(display-mode: standalone)').matches) {
  
        try {
          const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY});
          alert(token);
          
          if (token) {
            await saveUserToken(user.uid, token);
          }
        } catch (error) {
          console.error('FCM 토큰 가져오기 실패:', error);
        } 
      }
     } else {
      setUser(null);
    }

    setLoading(false);
  });
};
 

// onMessage(messaging, (payload) => {
//     console.log("포어그라운드 메시지 수신: ", payload);
  
//     const notificationTitle = payload.notification?.title || "알림 제목 없음";
//     const notificationBody = payload.notification?.body || "알림 내용 없음";
  
//     new Notification(notificationTitle, {
//       body: notificationBody,
//     });
//   });
