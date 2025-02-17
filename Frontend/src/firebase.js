// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "morning-dispatch-7386c.firebaseapp.com",
  projectId: "morning-dispatch-7386c",
  storageBucket: "morning-dispatch-7386c.firebasestorage.app",
  messagingSenderId: "1295064608",
  appId: "1:1295064608:web:1d87bdd0f628b5f5f86645"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);