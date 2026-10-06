import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBg1g1xMau6wUgRqT5snuRDDOmKnjspy4E",
  authDomain: "web-carros-9c243.firebaseapp.com",
  projectId: "web-carros-9c243",
  storageBucket: "web-carros-9c243.firebasestorage.app",
  messagingSenderId: "494494120587",
  appId: "1:494494120587:web:e3f67b7f8fc05c747bf28e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
