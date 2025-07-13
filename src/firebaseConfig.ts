import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCMdhoXzLSZSY7MEavFaBCWOwgqWTZ3vjA",
  authDomain: "codey-1f630.firebaseapp.com",
  projectId: "codey-1f630",
  storageBucket: "codey-1f630.firebasestorage.app",
  messagingSenderId: "1025550266658",
  appId: "1:1025550266658:web:5c6ea4805b00347e82b57b",
  measurementId: "G-0549XV89L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
