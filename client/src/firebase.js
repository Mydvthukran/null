import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD2zCpg2w_TQMaHLWyF8AP4TrNwMGRGjP4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "college-website-cbebe.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "college-website-cbebe",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "college-website-cbebe.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "900081217966",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:900081217966:web:ef59a5c06a2477e0e6d83f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FRZKYCEBGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged
};

