import useAuthStore from '../store/authStore';
import {  setInitUser } from './database';
import firebase from 'firebase/compat/app';
import { auth } from "./firebase-config";


// export function login() {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   return auth.signInWithPopup(provider);
// }

export function logout() {
  return firebase.auth().signOut();
}

export const listenToAuthChanges = () => {
  auth.onAuthStateChanged(async (rawUser) => {
    console.log(rawUser);
    

    const { setUser, setLoading } = useAuthStore.getState();
    setLoading(true);

    try {
      if (rawUser) {
        // const user = await getSubcribeMarathons(rawUser);
        const user = rawUser;
        setUser(user);
        await setInitUser(user.uid);

        // if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        //   await handleFCMToken(user.uid);
        // }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('인증 상태 처리 중 오류:', error);
    } finally {
      setLoading(false);
    }
  });
};

const handleFCMToken = async (uid) => {
  try {
    const token = await messaging.getToken({
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
