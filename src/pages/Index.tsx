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

const messaging = getMessaging();

// onMessage(messaging, (payload) => {
//     console.log("알림 도착 ", payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body
//     };
    

//     if (Notification.permission === "granted") {
//         new Notification(notificationTitle, notificationOptions);
//     }
// });


const handelClick = async () => {
    await fetch('http://localhost:3000/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        token: "dofRmJbOcmMHmeKjHLLrho:APA91bHwljA0shCtYWjxXQ1xgoyyii5CFoyLr2Q2y0R-R_9P8Ih-NcO-PRJe-KFBY7u2TyvFy7s0zECm6U9e7VU0xFlhgjDmT-dVyd2ZVYSrZjV3ozpx7Kw",
        title: '푸시 알림 제목',
        body: '푸시 알림 본문 내용',
        }),
    });
}



  return <>Index
  {/* <button onClick={handelClick}>버튼</button> */}
  </>;
}
