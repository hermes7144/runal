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

// 알림수신??
const messaging = firebase.messaging();

self.addEventListener('push', function(event) {

  const message = event.data.json();  // FCM 메시지
  const title = message.data.title;
  const body = message.data.body;
  const clickAction = 'https://runnings.netlify.app';

  const options = {
    body,
    // notificationclick 있으면?
    data: {
      click_action: clickAction,
    },
    // 배지, 아이콘?
    badge: '/icons/favicon-32x32.png', 
    vibrate: [200, 100, 200],  // 진동 패턴
    timestamp: Date.now(),
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


// 서비스 워커 메시지 수신
navigator.serviceWorker.addEventListener('message', function(event) {
  const data = event.data;
  if (data.type === 'dynamic-island') {
    showDynamicIsland(data.title, data.body);
  }
});

// 다이나믹 아일랜드 스타일 UI 표시 함수
function showDynamicIsland(title, body) {
  const island = document.createElement('div');
  island.className = 'dynamic-island';
  island.innerHTML = `
    <strong>${title}</strong>
    <p>${body}</p>
  `;
  document.body.appendChild(island);

  // 일정 시간 후 제거
  setTimeout(() => {
    island.classList.add('fade-out');
    island.addEventListener('animationend', () => island.remove());
  }, 5000);
}
