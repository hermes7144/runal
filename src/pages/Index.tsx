import { getMessaging, onMessage } from 'firebase/messaging';
import useAuthStore from '../store/authStore';
import Races from './Marathons';

export default function Index() {
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return 'isLoading';

  return <>
  <Races/>
  </>;
}

const messaging = getMessaging();

onMessage(messaging, (payload) => {

  const notificationTitle = payload.notification?.title || "알림 제목 없음";
  const notificationBody = payload.notification?.body || "알림 내용 없음";

  new Notification(notificationTitle, {
    body: notificationBody,
  });
});
