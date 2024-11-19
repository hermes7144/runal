import { useEffect } from 'react';
import { handleAllowNotification } from '../service/notificationPermission';
import axios from 'axios';

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

const handelClick = async () => {
//   const addr = 'http://localhost:8888/.netlify/functions/sendNotification';
  const addr = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';


    try {
        const response = await axios.post(
            addr,  // URL
            {  // 요청 본문 (body)
              tokens: ["dofRmJbOcmMHmeKjHLLrho:APA91bHwljA0shCtYWjxXQ1xgoyyii5CFoyLr2Q2y0R-R_9P8Ih-NcO-PRJe-KFBY7u2TyvFy7s0zECm6U9e7VU0xFlhgjDmT-dVyd2ZVYSrZjV3ozpx7Kw",
                    "cbx8GkbfRxSRgAMVILej9-:APA91bEajGelZHEUj0kWFOoZqOZGqxPP1455JfPKq6qy8q0JhzKp3bbs2lsXk81a0ncYogYxxfqHZr6Ea12s12XGSrHPUjzzSZLnCj4hgqS7WG7v0wJNznE"],
              title: '푸시 알림 제목',
              body: '푸시 알림 본문 내용',
            },
            {  // 헤더 설정
              headers: {
                'Content-Type': 'application/json', // JSON 형식으로 전송
              },
            }
          );
  
      console.log('푸시 알림 전송 결과:', response.data);
    } catch (error) {
      console.error('푸시 알림 전송 실패:', error);
    }
  };

  return <>Index
  <button onClick={handelClick}>버튼</button>
  </>;
}
