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
    const { setUser, setLoading } = useAuthStore.getState();

    setLoading(true);

    try {
      if (rawUser) {
        await setInitUser(rawUser.uid);
        const user = await getSubcribeMarathons(rawUser);
                
        setUser(user);

        // PWA 모드일 경우 FCM 토큰 요청 및 저장
        // if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        // 모바일 기기인 경우
          if (window.navigator.userAgent.includes('SamsungBrowser') && window.navigator.userAgent.includes('Mobile')) {
          await handleFCMToken(user.uid);
        }
      } else {
        // 유저가 로그아웃되었거나 인증되지 않음
        setUser(null);
      }
    } catch (error) {
      console.error('인증 상태 처리 중 오류:', error);
    } finally {
      // 로딩 상태 해제
      setLoading(false);
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
      console.log('FCM 토큰 저장 완료:', token);
    } else {
      console.warn('FCM 토큰을 가져오지 못했습니다.');
    }
  } catch (error) {
    console.error('FCM 토큰 처리 중 오류:', error);
  }
};