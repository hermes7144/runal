// import { RaceProps } from '../types/RaceProps';
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from './firebaseConfig';
import { RaceProps } from '../types/RaceProps';

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

export async function saveTokenToFirestore(token) {
  
  try {
      const tokenRef = doc(db, "tokens", token);
      await setDoc(tokenRef, {
          token: token,
          createdAt: new Date()
      });
      console.log("토큰이 Firestore에 성공적으로 저장되었습니다.");
  } catch (error) {
      console.error("Firestore에 토큰 저장 중 오류 발생:", error);
  }
}