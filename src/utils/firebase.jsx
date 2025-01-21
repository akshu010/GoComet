/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyAGPmNfYsOzAtZlg7btV-Ppj4WO35rH6Q4",
  authDomain: "gocomet-d4501.firebaseapp.com",
  projectId: "gocomet-d4501",
  storageBucket: "gocomet-d4501.firebasestorage.app",
  messagingSenderId: "581705068183",
  appId: "1:581705068183:web:2ee6d15b5c7436944b03d2",
  measurementId: "G-JEVE82TF3G",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
