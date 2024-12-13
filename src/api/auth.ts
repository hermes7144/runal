import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import app, { messaging } from './firebase-config';
import useAuthStore from '../store/authStore';
import { getToken } from 'firebase/messaging';
import { setUserToken, setInitUser, getSubcribeMarathons } from './database';

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
  onAuthStateChanged(auth, async (rawUser) => {
    const { setUser, setAuthLoading } = useAuthStore.getState();

    setAuthLoading(true);

    try {
      if (rawUser) {
        await setInitUser(rawUser.uid);
        const user = await getSubcribeMarathons(rawUser);

        setUser(user);

        // 모바일 기기인 경우
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          await handleFCMToken(user.uid);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('인증 상태 처리 중 오류:', error);
    } finally {
      setAuthLoading(false);
    }
  });
};

// FCM 토큰을 가져오고 Firestore에 저장하는 별도 함수
const handleFCMToken = async (uid: string) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (token) {
      await setUserToken(uid, token);
    } 
  } catch (error) {
    console.error('FCM 토큰 처리 중 오류:', error);
  }
};
