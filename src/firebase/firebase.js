import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCerZG6DLxCoAazIsUjlwrddsmq0YYUK1U",
  authDomain: "trackjob-e9b1d.firebaseapp.com",
  projectId: "trackjob-e9b1d",
  storageBucket: "trackjob-e9b1d.firebasestorage.app",
  messagingSenderId: "610057911549",
  appId: "1:610057911549:web:2e66a4e383f035074b1294"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();