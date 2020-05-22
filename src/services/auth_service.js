import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export const AuthContext = React.createContext();
var auth = firebase.auth();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
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
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const token = await user.getIdTokenResult();
    if (token.claims.manager) {
      return user;
    } else {
      logout();
      throw new Error("403 - Forbidden");
    }
  } catch (ex) {
    alert(ex);
    console.error(ex);
  }
}

export async function logout() {
  await auth.signOut();
}
