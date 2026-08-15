import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCUJgV_mEj4i2bgZUuYxiY074OUA33F5EU",
  authDomain: "rawwebsite-77710.firebaseapp.com",
  projectId: "rawwebsite-77710",
  messagingSenderId: "1046755775156",
  appId: "1:1046755775156:web:779ab75c2d52d4a9313de1",
  measurementId: "G-KZ1YPXCDCG"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
