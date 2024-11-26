/* global importScripts */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const config ={ messagingSenderId:'alrammate.firebasestorage.app' };

firebase.initializeApp(config);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

self.addEventListener('notificationclick', function(event) {
  const notification = event.notification;
  const url = 'https://runnings.netlify.app/';  // 기본 URL 지정

  event.notification.close();  // 알림을 닫습니다.

  event.waitUntil(
    clients.openWindow(url)  // 클릭 시 해당 URL로 이동
  );
});

const messaging = firebase.messaging();

self.addEventListener('push', function (e) {
  const bc = new BroadcastChannel('fcm_channel');
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json();
  const notificationTitle = resultData.notification.title;
  const notificationOptions = {
    body: resultData.notification.body,
    icon: '/icons/favicon-32x32.png', // 사용자 정의 아이콘
    data: resultData.data,
    ...resultData,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 데이터 받을때만??
// messaging.onBackgroundMessage((payload) => {  
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: '바디다'
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });