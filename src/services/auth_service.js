import { notification } from "antd";
import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";
import { getEmployeeById } from "./db_service";

export const AuthContext = React.createContext();
var auth = firebase.auth();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((token) => {
          if (token.claims.manager) {
            setCurrentUser(user);
            getEmployeeById(user.uid).then((employee) =>
              setCurrentUser(employee)
            );
          } else {
            setCurrentUser(null);
          }
        });
      } else {
        setCurrentUser(null);
      }
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
    let res = await auth.signInWithEmailAndPassword(email, password);
    const token = await res.user.getIdTokenResult();
    if (!token.claims.hasOwnProperty("manager"))
      throw new Error(
        "This account does not have enought permission to access this aplication."
      );
  } catch (ex) {
    notification.error({ message: "Invalid login", description: ex.message });
    console.error(ex);
  }
}

export async function logout() {
  await auth.signOut();
}
