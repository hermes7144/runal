/* global importScripts */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const config ={
  apiKey: "temp",
  projectId: "temp",
  messagingSenderId: "temp",
  appId: "temp"
};

firebase.initializeApp(config);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
  self.clients.claim(); // 모든 클라이언트(페이지)에서 새 서비스 워커를 제어하도록 함
});

const messaging = firebase.messaging();

self.addEventListener('push', function(event) {

  const message = event.data.json();  // FCM 메시지
  const title = message.data.title;
  const body = message.data.body;
  const icon = message.data.icon;

  const currentOrigin = self.location.origin;
  const clickAction = currentOrigin === 'https://runal.netlify.app'
    ? 'https://runal.netlify.app/' :'https://dev-runal.netlify.app/';

  const options = {
    body,
    // notificationclick 있으면?
    data: {
      click_action: clickAction,
    },
    // 배지, 아이콘?
    icon: icon, 
    badge: '/icons/favicon-32x32.png', 
    vibrate: [200, 100, 200],  // 진동 패턴
    timestamp: Date.now(),
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();  // 알림을 닫습니다.

  const clickAction = event.notification.data.click_action;
  
  event.waitUntil(
    clients.openWindow(clickAction)
  );
});

// // 데이터 받을때만??
// messaging.onBackgroundMessage((payload) => {  
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: '바디다'
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });