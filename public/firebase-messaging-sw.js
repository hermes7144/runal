/* global importScripts */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const config = {
  apiKey: 'AIzaSyDRGQg2nWHBQjo6PTV9u51wp-J1hfD7y04',
  authDomain: 'alrammate.firebaseapp.com',
  projectId:'alrammate',
  messagingSenderId:'alrammate.firebasestorage.app',
  vapidKey: 'BCEqZPDQqPmm91G-bFFrsrCnnhH4rC-B4AxBkYVoJYb4Z90HYqZzzHJz82lQRMnaMBy84-LiAOGpuZkro3b-rQw',
  appId: '1:393905672119:web:c96a80dd317149fb0fe232'
};

firebase.initializeApp(config);
