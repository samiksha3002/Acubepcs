// pcs/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCy0g5WD-eChCSaNGKHcFtmk_AEPmmSEiQ",
  authDomain: "acubepcs.firebaseapp.com",
  projectId: "acubepcs",
  storageBucket: "acubepcs.firebasestorage.app",
  messagingSenderId: "112583224899",
  appId: "1:112583224899:web:adb689858b9a215c706ef6",
  measurementId: "G-68KZ5YWXW0",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export both
export { auth, db };
