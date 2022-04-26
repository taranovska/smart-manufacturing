import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhOe2nWR6d8nTnlmhfyDiHFtk6TgDA7pk",
  authDomain: "sm-firebase-ebfa8.firebaseapp.com",
  projectId: "sm-firebase-ebfa8",
  storageBucket: "sm-firebase-ebfa8.appspot.com",
  messagingSenderId: "905539017516",
  appId: "1:905539017516:web:adac404a4d5d1d0b602a89",
  measurementId: "G-9QVG6BVX7Q",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
