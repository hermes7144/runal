// import { RaceProps } from '../types/RaceProps';
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, or, orderBy, query, serverTimestamp, setDoc, startAfter, updateDoc, where, limit } from 'firebase/firestore';
import { db } from './firebase-config';
import { MarathonProps } from '../types/MarathonProps';
import dayjs from 'dayjs';

export const setInitUser = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid);

  try {
    const userDoc = await getDoc(userDocRef);
    

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        id: uid,
        notify: true,
        notification: {
          notify:true,
          regions: [],
          events: [],
        },
        marathons:[],
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('초기 유저 설정 실패:', error);
  }
};

// FCM 토큰을 Firestore에 저장하는 함수
export const setUserToken = async (uid: string, token: string) => {

  if (!uid || !token) {
    console.warn('유효하지 않은 UID 또는 토큰입니다.');
    return;
  }

    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      const existingToken = userDoc.data()?.token;
      
      if (existingToken !== token) {
        await setDoc(userDocRef, { token }, { merge: true });
      }
      console.log('FCM 토큰이 Firestore에 저장되었습니다.');
    } catch (error) {
      console.error('FCM 토큰 저장 실패:', error);
    }
};

export const fetchAllTokens = async () => {
  try {
    const tokensRef = collection(db, 'users');
    const snapshot = await getDocs(tokensRef);

    const tokens = snapshot.docs.map((doc) => doc.data().token);

    return tokens;
  } catch (error) {
    console.error('Error fetching all tokens:', error);
    throw error;
  }
};

export const getUserFCMToken = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.token; // FCM 토큰 반환
  } else {
    throw new Error('User not found');
  }
};

export const fetchUsers = async () => {
  try {
    const tokensRef = collection(db, 'users');
    const snapshot = await getDocs(tokensRef);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.error('Error fetching all tokens:', error);
    throw error;
  }
};

// 대회 목록 가져오기 함수
export async function getMarathons(status: string, limitNum:number, startAfterDoc?: any): Promise<{
  marathons: MarathonProps[];
  lastVisible: any;
}> {
  const today = dayjs();
  
 try {
  let marathonsQuery = query(
    collection(db, 'marathons'),
    orderBy('date', 'asc'),
    limit(limitNum) // 한 번에 가져올 데이터 개수
  );

  if (startAfterDoc) {
    marathonsQuery = query(marathonsQuery, startAfter(startAfterDoc));
  }

  
    if (status === 'open') {
      // 상태가 'open'인 경우
      marathonsQuery = query(
        marathonsQuery,
        where('endDate', '>=', today.format('YYYYMMDD')),  // '모집중' 상태는 endDate가 오늘 포함 이전
        where('isClosed', '==', false),  // '모집중' 상태만
  
      )
    } else if (status === 'close') {
      marathonsQuery = query(
        marathonsQuery,
        or(where('endDate', '<', today.format('YYYYMMDD')),
        where('isClosed', '==', true)), 
      );
    }
    
    const querySnapshot = await getDocs(marathonsQuery);
    
    const marathons: MarathonProps[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<MarathonProps, 'id'>),
    }));
  

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { marathons, lastVisible };
  
  } catch(e) {
    console.error(e);
    return {marathons:[], lastVisible:''};
  }
}

// 마라톤 정보 키값을 저장하기?
export async function setMarathon(marathonsData: MarathonProps) {
  try {
    await addDoc(collection(db, 'marathons'), marathonsData);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export const getNotification = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid); // uid에 해당하는 문서 참조
    const docSnapshot = await getDoc(userDocRef); // 문서 가져오기

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const notification = userData?.notification; // notification 필드 가져오기

      return notification;
    } else {
      console.log('문서가 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('알림 가져오기 실패:', error);
  }
};

export const setNotification = async (uid, notification) => {

  if (uid) {
    try {
      await setDoc(doc(db, 'users', uid), { notification }, { merge: true });
    } catch (error) {
      console.error('notification save error', error);
    }
  }
};


export const getSubcribeMarathons = async (user) => {
  const userDocRef = doc(db, 'users', user.uid);
  const docSnapshot = await getDoc(userDocRef); // 문서 가져오기

  try {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const marathons = userData.marathons || []; 

      return { ...user, marathons};
    } else {
      console.log('문서가 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('유저정보 가져오기 실패:', error);
  }

}

export const subscribeNotification = async (uid, marthonId) => {
  const userDocRef = doc(db, 'users', uid);

  await updateDoc(userDocRef, {
    marathons: arrayUnion(marthonId),
  });
};

export const unsubscribeNotification = async (uid, marthonId) => {
  const userDocRef = doc(db, 'users', uid);

  await updateDoc(userDocRef, {
    marathons: arrayRemove(marthonId),
  });
};

