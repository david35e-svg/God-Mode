"use client";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ערכי תצורה ציבוריים של Firebase לדפדפן. ההגנה על הנתונים נמצאת ב-firestore.rules.
const config = {
  apiKey: "AIzaSyCXV58QpFNWaJEdzcVpUCwpC1za5OGppRU",
  authDomain: "godmodetraveler-6071c.firebaseapp.com",
  projectId: "godmodetraveler-6071c",
  storageBucket: "godmodetraveler-6071c.firebasestorage.app",
  messagingSenderId: "717052648092",
  appId: "1:717052648092:web:61fa7c057cd89e439aeb59",
};

const app = () => getApps()[0] ?? initializeApp(config);
export const auth = () => getAuth(app());
export const db = () => getFirestore(app());
export const ADMIN_EMAIL = "david35e@gmail.com";
