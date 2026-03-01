import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmoOgrj-rg0N4d47813YX1cP4-XqQzLq4",
  authDomain: "samuel-kodie-portfolio.firebaseapp.com",
  projectId: "samuel-kodie-portfolio",
  storageBucket: "samuel-kodie-portfolio.firebasestorage.app",
  messagingSenderId: "544563945753",
  appId: "1:544563945753:web:b8cd76d9a0f7d4690ee588",
  measurementId: "G-YTKH53NC2J",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
