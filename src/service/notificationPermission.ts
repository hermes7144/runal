import { getMessaging, getToken } from "firebase/messaging";
import { saveTokenToFirestore } from '../api/database';

export async function handleAllowNotification() {
  const messaging = getMessaging();

    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
            });
            
            if (token) {
                saveTokenToFirestore(token);// (토큰을 서버로 전송하는 로직)

                // 서버에 토큰을 전송하여 푸시 알림을 받을 수 있도록 함
                // await fetch('http://localhost:3000/send-notification', {
                //     method: 'POST',
                //     // headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //     token: token,
                //     title: '푸시 알림 제목',
                //     body: '푸시 알림 본문 내용',
                //     }),
                // });

                // // 서버에 토큰을 전송하여 푸시 알림을 받을 수 있도록 함
            
            } else {
                alert(
                    "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
                );
            }
        } else if (permission === "denied") {
            alert(
                "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
            );
        }
    } catch (error) {
        console.error("푸시 토큰 가져오는 중에 에러 발생", error);
    }
}

