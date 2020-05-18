import moment from "moment";
import Appointment from "../models/appointment";
import firebase from "../config/firebase";

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

// Schedule
export function getSchedule(date) {
  const [firstDay, lastDay] = getFirstAndLastDay(date);
  return db
    .collection("schedule")
    .where("startTime", ">=", firstDay)
    .where("startTime", "<", lastDay)
    .orderBy("startTime", "asc")
    .get()
    .then((querySnap) =>
      querySnap.docs.map((doc) => new Appointment(doc.id, doc.data()))
    )
    .catch((err) => console.error(err));
}

export function getAppointmentById(appointmentId) {
  console.log(appointmentId);
  return db
    .collection("schedule")
    .doc(appointmentId)
    .get()
    .then((snap) => new Appointment(snap.id, snap.data()))
    .catch((err) => console.error(err));
}

export function rescheduleAppointment(appointmentId, update) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .update(update)
    .catch((err) => console.error(err));
}

export function cancelAppointmentById(appointmentId) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .delete()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

export function updateAppointmentUpgrades(appointmentId, upgrades) {
  db.collection("schedule")
    .doc(appointmentId)
    .update({
      upgrades,
    })
    .catch((err) => console.error(err));
}

// Upgrades Specific
export function getUpgrades() {
  return db
    .collection("upgrades")
    .get()
    .then((querySnap) => querySnap.docs.map((doc) => doc.data()))
    .catch((err) => console.error(err));
}

export function getServices() {
  return db
    .collection("services")
    .orderBy("price", "asc")
    .get()
    .then((querySnap) => querySnap.docs.map((doc) => doc.data()))
    .catch((err) => console.error(err));
}

export function addNewService(service) {
  return db
    .collection("services")
    .add(service)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
