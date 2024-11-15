import { getMessaging, getToken } from 'firebase/messaging';
import React from 'react';

 export default function Index() {
  const messaging = getMessaging();
  getToken(messaging, { vapidKey: import.meta.env.VITE_APP_VAPID_KEY }).then((currentToken) => {
  if (currentToken) {
    console.log(currentToken);
    
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
  return <>Index</>;
}