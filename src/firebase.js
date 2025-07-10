import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOW5kWbvqexfn8JXvvUtAwPlbHXCkoh3M",
  authDomain: "pocket-management-93dba.firebaseapp.com",
  projectId: "pocket-management-93dba",
  storageBucket: "pocket-management-93dba.firebasestorage.app",
  messagingSenderId: "602070514808",
  appId: "1:602070514808:web:d9156bd1cd73fec6d6418d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
