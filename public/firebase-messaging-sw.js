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

const messaging = firebase.messaging();

// 데이터 받을때만??
// messaging.onBackgroundMessage((payload) => {  
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: '바디다'
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });