import { fetchAllTokens } from '../api/database';
import Races from './Marathons';

export default function Index() {

const handelClick = async () => {
  const tokens = await fetchAllTokens();
  
    // const addr = 'http://localhost:8888/.netlify/functions/sendNotification';
  const addr = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';

    await fetch(addr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        tokens: tokens,
        title: '푸시 알림 제목',
        body: '푸시 알림 본문 내용',
        }),
    });
}


  return <>
  {/* <button onClick={handelClick}>버튼</button> */}
  <Races/>
  </>;
}

