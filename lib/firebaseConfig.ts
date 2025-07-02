import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_ozZQXOsOWmz1lCXOHRhptKrn5z26R5o",
  authDomain: "grammoro-ad775.firebaseapp.com",
  projectId: "grammoro-ad775",
  storageBucket: "grammoro-ad775.appspot.com",
  messagingSenderId: "252907147859",
  appId: "1:252907147859:web:938d9b814df80f3191aca6",
  measurementId: "G-V8W5TMK8ZY"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};