// import { RaceProps } from '../types/RaceProps';
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { RaceProps } from '../types/RaceProps';
import useAuthStore from '../store/authStore';

// 대회 목록 가져오기 함수
export async function getRaces() {
  const querySnapshot = await getDocs(collection(db, "races"));  

  const races = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));  
  return races;
}

export async function saveRace(raceData :RaceProps) {
  try {
    const docRef = await addDoc(collection(db, "races"), raceData);
    console.log("대회 정보가 저장되었습니다. 문서 ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


// FCM 토큰을 Firestore에 저장하는 함수
export const saveFCMTokenToDatabase = async (token) => {
  const userId = useAuthStore.getState().user?.uid;  // Zustand에서 사용자 ID 가져오기
  if (userId && token) {
    try {
      await setDoc(doc(db, 'users', userId), {
        fcmToken: token,
      }, { merge: true });
      console.log('FCM 토큰이 Firestore에 저장되었습니다.');
    } catch (error) {
      console.error('FCM 토큰 저장 실패:', error);
    }
  }
};