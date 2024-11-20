import { useEffect } from 'react';
import { handleAllowNotification } from '../service/notificationPermission';

export default function Index() {

  useEffect(() => {
    handleAllowNotification();
    registerServiceWorker();
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


const handelClick = async () => {
    // const addr = 'http://localhost:3000/send-notification';
    // const addr = 'http://localhost:8888/.netlify/functions/sendNotification';
    const addr = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';

    await fetch(addr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        tokens: ["dofRmJbOcmMHmeKjHLLrho:APA91bHwljA0shCtYWjxXQ1xgoyyii5CFoyLr2Q2y0R-R_9P8Ih-NcO-PRJe-KFBY7u2TyvFy7s0zECm6U9e7VU0xFlhgjDmT-dVyd2ZVYSrZjV3ozpx7Kw",
                "eeyLuBmeQoMbXEcbbBcEqC:APA91bF6Xo57W_RvP6xVBLiQcVUP_B-Xqb-kEFr01rZusCJVuqjcNgHOvubj8Vy8Wjiu3QBCNVXOQ3adpBePxHctsC_DFCvN1M7UvyHMYGj-e5uK4uzPzHY",
                "cbx8GkbfRxSRgAMVILej9-:APA91bEajGelZHEUj0kWFOoZqOZGqxPP1455JfPKq6qy8q0JhzKp3bbs2lsXk81a0ncYogYxxfqHZr6Ea12s12XGSrHPUjzzSZLnCj4hgqS7WG7v0wJNznE"
        ],
        title: '푸시 알림 제목',
        body: '푸시 알림 본문 내용',
        }),
    });
}

  return <>Index
  <button onClick={handelClick}>버튼</button>
  </>;
}
