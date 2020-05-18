import firebase from "../config/firebase";

var auth = firebase.auth();

export function isUserLoggedIn() {
  return auth.onAuthStateChanged((user) => {
    return user != null;
  });
}

export async function login(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .catch((ex) => console.error(ex));
}

export async function logout() {
  auth.signOut().catch((err) => console.error(err));
}
