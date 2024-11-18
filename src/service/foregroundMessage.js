import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./initFirebase";

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    console.log("알림 도착 ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };

    console.log(notificationTitle,notificationOptions );
    

    if (Notification.permission === "granted") {
        new Notification(notificationTitle, notificationOptions);
    }
});




// messaging.onBackgroundMessage((payload) => {
//     console.log('payload',payload);
    
//     const notificationTitle = payload.title;
//     const notificationOptions = {
//         body: payload.body
//         // icon: payload.icon
//     };
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });