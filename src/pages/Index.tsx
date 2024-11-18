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

  return <>Index</>;
}
