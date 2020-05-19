import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export const AuthContext = React.createContext();
var auth = firebase.auth();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // auth.onAuthStateChanged(setCurrentUser);
    auth.onAuthStateChanged(function (user) {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export async function login(email, password) {
  await auth.signInWithEmailAndPassword(email, password);
}

export async function logout() {
  await auth.signOut();
}
