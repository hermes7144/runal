// import { RaceProps } from '../types/RaceProps';
import { addDoc, collection, getDocs } from "firebase/firestore";
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