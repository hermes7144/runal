import { fetchUsers } from '../api/database';

export function registerServiceWorker() {
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

export async function sendNotification(title, region, events) {
    console.log(title, region, events);
    

    const users = await fetchUsers();

    const filteredUsersTokens = users.filter(user => {
        const hasRegion = user.notification.regions.includes(region);
        const hasEvents = events.some(event => user.notification.events.includes(event));
        return hasRegion && hasEvents;
    }).map(user => user.token);    

    // const url = 'http://localhost:8888/.netlify/functions/sendNotification';
    const url = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        tokens: filteredUsersTokens,
        title,
        body: region + '' + events
        }),
    });
  }