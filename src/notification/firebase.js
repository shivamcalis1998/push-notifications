import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBXgjU4hRMiIpoiTk0CPhoD9t_Tc4fjf14",
  authDomain: "push-notifications-4ac04.firebaseapp.com",
  projectId: "push-notifications-4ac04",
  storageBucket: "push-notifications-4ac04.appspot.com",
  messagingSenderId: "477859399804",
  appId: "1:477859399804:web:1053869b7dbc8410c261f9",
  measurementId: "G-FYM4ZLM71G",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const ganerateToken = async () => {
  let permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BC8sy18sEaDlu9_PPI3Ee4QB1gxRtrAai9r6L4cO8Vq6XUKXVzc1k9NFm76BtvBvZecHMhvNH21GecuPEnQKysw",
    });

    console.log(token);

    const makePostToken = async () => {
      await fetch("https://push-notifications-backend.onrender.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
    };
    makePostToken();
  }
};
