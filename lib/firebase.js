// pcs/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy0g5WD-eChCSaNGKHcFtmk_AEPmmSEiQ",
  authDomain: "acubepcs.firebaseapp.com",
  projectId: "acubepcs",
  storageBucket: "acubepcs.firebasestorage.app",
  messagingSenderId: "112583224899",
  appId: "1:112583224899:web:adb689858b9a215c706ef6",
  measurementId: "G-68KZ5YWXW0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
