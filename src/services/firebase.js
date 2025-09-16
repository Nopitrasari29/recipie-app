import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 1. Definisikan konfigurasi dari environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// ======================= TES DIAGNOSTIK PALING PENTING =======================
// Cetak seluruh objek konfigurasi ke console.
// Kita akan periksa apakah ada nilai yang 'undefined' di sini.
console.log("--- START KONFIGURASI FIREBASE ---");
console.log(firebaseConfig);
console.log("--- END KONFIGURASI FIREBASE ---");
// ===========================================================================

// 2. Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// 3. Dapatkan dan Ekspor layanan
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };