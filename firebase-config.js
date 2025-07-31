import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTC00hclv_wN4lwIWM2SH9wT62Fmqz10E",
  authDomain: "mi-negocio-facil.firebaseapp.com",
  projectId: "mi-negocio-facil",
  storageBucket: "mi-negocio-facil.firebasestorage.app",
  messagingSenderId: "765729154711",
  appId: "1:765729154711:web:dd75cf1976cc1e84f66bd2",
  measurementId: "G-M71KB4L47K"};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
