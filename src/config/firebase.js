import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyARcO2C-jzRqTZb52_cV2N3gEE9JS28nqE",
  authDomain: "bubbly-app-6ff08.firebaseapp.com",
  databaseURL: "https://bubbly-app-6ff08.firebaseio.com",
  projectId: "bubbly-app-6ff08",
  storageBucket: "bubbly-app-6ff08.appspot.com",
  messagingSenderId: "145455557141",
  appId: "1:145455557141:web:ec9c022d19479204f5fc1c",
});

export default firebase;
