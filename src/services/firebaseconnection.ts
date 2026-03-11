import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjqnjBMGuyED78BTQny8LQxyFayEGPL10",
  authDomain: "webcarros-d7e95.firebaseapp.com",
  projectId: "webcarros-d7e95",
  storageBucket: "webcarros-d7e95.firebasestorage.app",
  messagingSenderId: "1002238212521",
  appId: "1:1002238212521:web:08bebb5341b6f8d7286cb8",
  measurementId: "G-NV0M07B26D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
