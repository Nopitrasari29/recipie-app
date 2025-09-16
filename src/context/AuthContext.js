import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// 'getDoc' telah dihapus dari baris import di bawah ini
import { doc, onSnapshot } from 'firebase/firestore'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener untuk status otentikasi Firebase
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Jika pengguna login, buat listener real-time ke dokumen user mereka di Firestore
        const docRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            console.log("No such user document!");
          }
        });
        
        setLoading(false);
        // Kembalikan listener snapshot agar bisa di-cleanup saat komponen unmount
        return unsubscribeSnapshot;

      } else {
        // Jika pengguna logout, reset semua data dan hentikan loading
        setUserData(null);
        setLoading(false);
      }
    });

    // Cleanup listener otentikasi saat komponen unmount
    return unsubscribeAuth;
  }, []);

  const value = {
    currentUser,
    userData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}