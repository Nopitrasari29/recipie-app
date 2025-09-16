import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore'; // Import onSnapshot untuk real-time update

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // State BARU untuk data pengguna (termasuk favorit)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener untuk status login (Authentication)
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Jika user login, kita ambil datanya dari Firestore
        const docRef = doc(db, 'users', user.uid);
        // Listener BARU untuk data pengguna (Firestore) secara real-time
        const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            console.log("No such user document!");
          }
        });
        
        setLoading(false);
        // Kembalikan listener snapshot untuk di-cleanup
        return unsubscribeSnapshot;

      } else {
        // Jika user logout, reset semuanya
        setUserData(null);
        setLoading(false);
      }
    });

    // Cleanup listener otentikasi
    return unsubscribeAuth;
  }, []);

  const value = {
    currentUser,
    userData, // Sediakan userData ke seluruh aplikasi
    loading
  };

  // Jangan render aplikasi sampai status loading awal selesai
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}