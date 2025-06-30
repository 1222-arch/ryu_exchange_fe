import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const adminEmails = import.meta.env.VITE_ADMIN_EMAILS
      ? import.meta.env.VITE_ADMIN_EMAILS.split(',')
      : [];
  
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAdmin(firebaseUser?.email && adminEmails.includes(firebaseUser.email));
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  
  const logout = async () => {
    await firebaseSignOut(auth);
    setUser(null); // Reset lại user để UI update
  };

  return (
    <AuthContext.Provider value={{ user ,logout,isAdmin ,loading}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
