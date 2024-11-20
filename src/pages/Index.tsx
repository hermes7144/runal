import { useEffect } from 'react';
import { handleAllowNotification, registerServiceWorker } from '../service/notificationPermission';



export default function Index() {

  useEffect(() => {
    handleAllowNotification();
    registerServiceWorker();
  }, []);



const handelClick = async () => {
    // const addr = 'http://localhost:3000/send-notification';
    const addr = 'http://localhost:8888/.netlify/functions/sendNotification';
//   const addr = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';

    await fetch(addr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        tokens: ["dofRmJbOcmMHmeKjHLLrho:APA91bHwljA0shCtYWjxXQ1xgoyyii5CFoyLr2Q2y0R-R_9P8Ih-NcO-PRJe-KFBY7u2TyvFy7s0zECm6U9e7VU0xFlhgjDmT-dVyd2ZVYSrZjV3ozpx7Kw",
            "cbx8GkbfRxSRgAMVILej9-:APA91bHTMzEOuDQxPBOF15D543o6uv9bQkwJkJB3b_DX1LwdmWoVrmyTAfpbekwPC0bc5zJbcpxteqb6SqhuSA_2UrA1YW25x_TCX7fdC55yKnieqD1Bh3s",
            "eeyLuBmeQoMbXEcbbBcEqC:APA91bGpa9tOqNnteTQv1rKDwmjcmnWd370YGKgSUUaeOOq4LitGPFNDoEWAkJQdtv3bok4U29KvbZPwsrduuFoboS0iCKeEDFDTdVAzHn3ntMV6qX7b8dY"

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
