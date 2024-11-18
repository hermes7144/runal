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

Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    // 알림을 보낼 수 있는 권한이 허용됨
    const notification = new Notification("새로운 알림", {
      body: "새로운 메시지가 도착했습니다.",
      icon: '/images/icon.png'
    });
    
    // 클릭 시 동작 설정
    notification.onclick = () => {
      window.location.href = '/some-page'; // 알림 클릭 시 리디렉션
    };
  } else {
    console.log("알림 권한이 거부되었습니다.");
  }
});


  return <>Index</>;
}
