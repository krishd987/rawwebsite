import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.CONFIG_FIREBASE_API_KEY,
  authDomain: process.env.CONFIG_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.CONFIG_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.CONFIG_FIREBASE_APP_ID,
  measurementId: process.env.CONFIG_FIREBASE_MEASUREMENT_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
