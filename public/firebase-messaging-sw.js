/* global importScripts */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const config ={
  apiKey: "AIzaSyDRGQg2nWHBQjo6PTV9u51wp-J1hfD7y04",
  messagingSenderId: '393905672119',
  appId: '1:393905672119:web:c96a80dd317149fb0fe232',
  projectId: "alrammate",
};

firebase.initializeApp(config);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const messaging = firebase.messaging();

self.addEventListener('push', function(event) {
  const message = event.data.json();  // FCM 메시지
  const title = message.notification.title;
  const body = message.notification.body;
  const clickAction = 'https://runnings.netlify.app/';  // 기본 URL 설정

  const options = {
    body: body,
    icon: '/icons/favicon-32x32.png',
    data: {
      click_action: clickAction,
    },
    badge: '/icons/favicon-32x32.png', 
    vibrate: [200, 100, 200],  // 진동 패턴
    tag: 'new-notification',  // 알림을 고유한 태그로 식별
  };


  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  const clickAction = 'https://runnings.netlify.app';
  event.notification.close();  // 알림을 닫습니다.

  event.waitUntil(
    clients.openWindow(clickAction)  // 클릭 시 해당 URL로 이동
  );
});



// 데이터 받을때만??
// messaging.onBackgroundMessage((payload) => {  
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: '바디다'
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });