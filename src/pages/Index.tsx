import { useEffect } from 'react';
import { handleAllowNotification, registerServiceWorker } from '../service/notificationPermission';
// import { getMessaging, onMessage } from "firebase/messaging";



export default function Index() {

  useEffect(() => {
    handleAllowNotification();
    registerServiceWorker();
  }, []);



const handelClick = async () => {
    // const addr = 'http://localhost:3000/send-notification';
    const addr = 'http://localhost:8888/.netlify/functions/sendNotification';
  //const addr = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';

    await fetch(addr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        tokens: ["dofRmJbOcmMHmeKjHLLrho:APA91bHwljA0shCtYWjxXQ1xgoyyii5CFoyLr2Q2y0R-R_9P8Ih-NcO-PRJe-KFBY7u2TyvFy7s0zECm6U9e7VU0xFlhgjDmT-dVyd2ZVYSrZjV3ozpx7Kw",
            "cbx8GkbfRxSRgAMVILej9-:APA91bFnhx9OWKzvgvffwC1EFbDSZ_z64Rby5H8HGECFjNKQanEhG0hHsbl5nunj3pfNwripN_9pHzl1r8uhLqWrytMDSU6-Cl6ZT3uSkbFm3iGxhPVyGOE",
            "eeyLuBmeQoMbXEcbbBcEqC:APA91bGpa9tOqNnteTQv1rKDwmjcmnWd370YGKgSUUaeOOq4LitGPFNDoEWAkJQdtv3bok4U29KvbZPwsrduuFoboS0iCKeEDFDTdVAzHn3ntMV6qX7b8dY",

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
