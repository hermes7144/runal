import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import React, { useEffect } from 'react';

export default function Index() {
  const messaging = getMessaging();

  useEffect(() => {
    requestPermission();
  }, []);

  // 토큰 요청 및 권한 요청
  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID_KEY }).then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            // Send the token to your server and update the UI if necessary
            // ...
          } else {
            console.log('No registration token available. Request permission to generate one.');
            // Handle case when no token is available
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token: ', err);
        });
      }
    });
  }

  // FCM 메시지 수신 처리
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);

    // 알림 메시지가 있는지 확인하고, 없는 경우에는 데이터 메시지를 처리
    if (payload.notification) {
      console.log('Notification title:', payload.notification.title);
      console.log('Notification body:', payload.notification.body);
    } else if (payload.data) {
      console.log('Data message received:', payload.data);
      // 데이터 메시지 처리 (예: payload.data.someField)
    }
  });

  return <>Index</>;
}
