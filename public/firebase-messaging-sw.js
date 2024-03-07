importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBXgjU4hRMiIpoiTk0CPhoD9t_Tc4fjf14",
  authDomain: "push-notifications-4ac04.firebaseapp.com",
  projectId: "push-notifications-4ac04",
  storageBucket: "push-notifications-4ac04.appspot.com",
  messagingSenderId: "477859399804",
  appId: "1:477859399804:web:1053869b7dbc8410c261f9",
  measurementId: "G-FYM4ZLM71G",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
