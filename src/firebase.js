// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF-ZUK4yFJYJ_652vYEGrpiggRClPTJRE",
  authDomain: "webchat-43588.firebaseapp.com",
  projectId: "webchat-43588",
  storageBucket: "webchat-43588.appspot.com",
  messagingSenderId: "743098567485",
  appId: "1:743098567485:web:7e1cc6b02c6db0c70c1354",
  measurementId: "G-5Y7S87K8QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
