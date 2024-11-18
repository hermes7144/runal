import { useEffect } from 'react';
import { handleAllowNotification } from '../service/notificationPermission';

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

if (Notification.permission === 'granted') {
  const notificationTitle = "새로운 알림";
  const notificationOptions = {
    body: "새로운 메시지가 도착했습니다.",
    icon: '/images/icon.png',  // 알림에 표시할 아이콘
    vibrate: [200, 100, 200],  // 진동 패턴
  };

  const notification = new Notification(notificationTitle, notificationOptions);

  // 알림 클릭 시 동작 정의
  notification.onclick = function () {
    window.location.href = '/some-page';  // 클릭 시 리디렉션
  };
}

  return <>Index</>;
}
