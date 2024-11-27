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


// self.addEventListener('push', function(event) {
//   const message = event.data.json();  // FCM 메시지
//   const title = message.notification.title;
//   const body = message.notification.body;
//   const clickAction = 'https://runnings.netlify.app/';  // 기본 URL 설정

//   const options = {
//     body: body,
//     icon: '/icons/favicon-32x32.png',  // 기본 아이콘
//     data: {
//       click_action: clickAction,  // 클릭 시 이동할 링크
//     }
//   };

//   event.waitUntil(
//     self.registration.showNotification(title, options)
//   );
// });

// self.addEventListener('notificationclick', function(event) {
//   const clickAction = 'https://runnings.netlify.app';
//   event.notification.close();  // 알림을 닫습니다.

//   event.waitUntil(
//     clients.openWindow(clickAction)  // 클릭 시 해당 URL로 이동
//   );
// });



// const messaging = firebase.messaging();


// 데이터 받을때만??
// messaging.onBackgroundMessage((payload) => {  
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: '바디다'
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });