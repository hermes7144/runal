import { useEffect } from 'react';
import { handleAllowNotification } from '../service/notificationPermission';
import { getMessaging, onMessage } from 'firebase/messaging';
import app from '../api/firebaseConfig';

export default function Index() {

  useEffect(() => {
    handleAllowNotification();
  }, []);

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("/firebase-messaging-sw.js")
                .then(function (registration) {
                    console.log(
                        "Service Worker가 scope에 등록되었습니다.:",
                        registration.scope
                    );
                })
                .catch(function (err) {
                    console.log("Service Worker 등록 실패:", err);
                });
        });
    }
}
registerServiceWorker();

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    console.log("알림 도착 ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };
    

    if (Notification.permission === "granted") {
        new Notification(notificationTitle, notificationOptions);
    }
});





  return <>Index</>;
}
