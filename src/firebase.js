// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2G-Bl-s4D5SjKDtJ69DJX2feMO0K-wh8",
  authDomain: "chat-br-cdb05.firebaseapp.com",
  projectId: "chat-br-cdb05",
  storageBucket: "chat-br-cdb05.appspot.com",
  messagingSenderId: "902544350031",
  appId: "1:902544350031:web:3953fd25070db30826033a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = app.auth();