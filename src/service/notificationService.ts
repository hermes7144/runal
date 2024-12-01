import { fetchUsers } from '../api/database';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function (registration) {
          console.log('Service Worker가 scope에 등록되었습니다.:', registration.scope);
        })
        .catch(function (err) {
          console.log('Service Worker 등록 실패:', err);
        });
    });
  }
}

export async function sendNotification(title, region, events) {
  const users = await fetchUsers();

  const filteredUsersTokens = users
    .filter((user) => {
      if (!user.notify) return false;

      const hasRegion = user.notification.regions.length === 0 || user.notification.regions.includes(region);
      const hasEvents = user.notification.events.length === 0 || events.some((event) => user.notification.events.includes(event));
      return hasRegion && hasEvents;
    })
    .map((user) => user.token);

  if (filteredUsersTokens.length === 0) return;

  // const url = 'http://127.0.0.1:5001/alrammate/us-central1/sendPushNotifications';
  const url = 'https://us-central1-dev-runnoti.cloudfunctions.net/sendPushNotifications';

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tokens: filteredUsersTokens,
      title,
      body: region + ' ' + events,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
}

// 알림 권한 요청 함수
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
    } else {
      console.log("알림 권한이 거부되었습니다.");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패: ", error);
  }
};
