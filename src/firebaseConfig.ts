// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: "AIzaSyCMdhoXzLSZSY7MEavFaBCWOwgqWTZ3vjA",
//   authDomain: "codey-1f630.firebaseapp.com",
//   projectId: "codey-1f630",
//   storageBucket: "codey-1f630.firebasestorage.app",
//   messagingSenderId: "1025550266658",
//   appId: "1:1025550266658:web:5c6ea4805b00347e82b57b",
//   measurementId: "G-0549XV89L7"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCTUbdbrPRc0BETT2LHWjwJd5m6SPHYLGc",
  authDomain: "codey-90974.firebaseapp.com",
  projectId: "codey-90974",
  storageBucket: "codey-90974.firebasestorage.app",
  messagingSenderId: "1029262467164",
  appId: "1:1029262467164:web:e1c4246fc2145c8ccd0699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in production)
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
