import moment from "moment";
import Appointment from "../models/appointment";

// Initialization
const firebase = require("firebase");
require("firebase/firebase-firestore");

firebase.initializeApp({
  apiKey: "AIzaSyARcO2C-jzRqTZb52_cV2N3gEE9JS28nqE",
  authDomain: "bubbly-app-6ff08.firebaseapp.com",
  databaseURL: "https://bubbly-app-6ff08.firebaseio.com",
  projectId: "bubbly-app-6ff08",
  storageBucket: "bubbly-app-6ff08.appspot.com",
  messagingSenderId: "145455557141",
  appId: "1:145455557141:web:ec9c022d19479204f5fc1c"
});

const db = firebase.firestore();

// Helper Functions
function getFirstAndLastDay(date) {
  const dt = moment(date),
    y = date.getFullYear(),
    m = date.getMonth();

  const firstDay = new Date(y, m, 1).toISOString();
  const lastDay = new Date(y, m + 1, 0).toISOString();

  return [firstDay, lastDay];
}

// Overall Schedule
export function getSchedule(date) {
  const [firstDay, lastDay] = getFirstAndLastDay(date);
  return db
    .collection("schedule")
    .where("startTime", ">=", firstDay)
    .where("startTime", "<", lastDay)
    .orderBy("startTime", "asc")
    .get()
    .then(querySnap =>
      querySnap.docs.map(doc => new Appointment(doc.id, doc.data()))
    )
    .catch(err => console.error(err));
}

// Appointment Specific
export function getAppointmentById(appointmentId) {
  console.log(appointmentId);
  return db
    .collection("schedule")
    .doc(appointmentId)
    .get()
    .then(snap => new Appointment(snap.id, snap.data()))
    .catch(err => console.error(err));
}

export function getAppointmentUpdates(appointmentId) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .collection("updates")
    .orderBy("updatedAt", "asc")
    .get()
    .then(querySnap => querySnap.docs.map(doc => doc.data()));
}

export function rescheduleAppointment(appointmentId, update) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .update(update)
    .catch(err => console.error(err));
}

export function cancelAppointment(appointmentId) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .delete()
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

export function updateAppointmentUpgrades(appointmentId, upgrades) {
  db.collection("schedule")
    .doc(appointmentId)
    .update({
      upgrades
    })
    .catch(err => console.error(err));
}

// Upgrades Specific
export function getUpgrades() {
  return db
    .collection("upgrades")
    .get()
    .then(querySnap => querySnap.docs.map(doc => doc.data()))
    .catch(err => console.error(err));
}