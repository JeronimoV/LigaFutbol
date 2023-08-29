// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtl5keESW09NfYl92ceyMG01ocyKhLMs8",
  authDomain: "ligafutbol-ccc4c.firebaseapp.com",
  projectId: "ligafutbol-ccc4c",
  storageBucket: "ligafutbol-ccc4c.appspot.com",
  messagingSenderId: "841070815305",
  appId: "1:841070815305:web:eabb2d07f3cea33d493798",
  measurementId: "G-KEB9QBJSHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)