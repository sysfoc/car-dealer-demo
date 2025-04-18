import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sysfoc-car-dealor.firebaseapp.com",
  projectId: "sysfoc-car-dealor",
  storageBucket: "sysfoc-car-dealor.firebasestorage.app",
  messagingSenderId: "692421306565",
  appId: "1:692421306565:web:b3537d365e1d58e73ba8ac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
