// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFZdUJfCYkKnat33cd-rQL1UJ0wJi9tO4",
  authDomain: "negociofacil-4f4a4.firebaseapp.com",
  projectId: "negociofacil-4f4a4",
  storageBucket: "negociofacil-4f4a4.appspot.com",
  messagingSenderId: "854084606540",
  appId: "1:854084606540:web:474efcf56bf0f3ef69f2e9",
  measurementId: "G-BQP3M471YK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
