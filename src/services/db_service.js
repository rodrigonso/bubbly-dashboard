import moment from "moment";
import firebase from "../config/firebase";
import User from "../models/User";
import Address from "../models/Address";

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
      querySnap.docs.map(function (doc) {
        const obj = doc.data();
        obj.id = doc.id;
        return obj;
      })
    )
    .catch((err) => console.error(err));
}

async function getAllUserData(userSnap) {
  const sources = await userSnap.ref
    .collection("sources")
    .get()
    .then((snap) => snap.docs.map((item) => item.data()));
  const addresses = await userSnap.ref
    .collection("addresses")
    .get()
    .then((snap) => snap.docs.map((doc) => new Address(doc.id, doc.data())));
  const vehicles = await userSnap.ref
    .collection("vehicles")
    .get()
    .then((snap) => snap.docs.map((item) => item.data()));
  return { sources, addresses, vehicles };
}

export async function getUsers() {
  const usersRef = await db.collection("users").get();

  const promise = usersRef.docs.map(async (userSnap) => {
    const user = userSnap.data();
    user.id = userSnap.id;
    const { sources, addresses, vehicles } = await getAllUserData(userSnap);
    user.addresses = addresses;
    user.vehicles = vehicles;
    user.sources = sources;
    return new User(user);
  });

  return await Promise.all(promise);
}

export async function deleteUserById(userId) {
  return db
    .collection("users")
    .doc(userId)
    .delete()
    .catch((err) => alert(err));
}

export async function bookAppointment(appointment) {
  return db
    .collection("schedule")
    .add(appointment)
    .catch((err) => alert(err));
}

export function getAppointmentById(appointmentId) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .get()
    .then((snap) => {
      const obj = snap.data();
      obj.id = snap.id;
      return obj;
    })
    .catch((err) => alert(err));
}

export function rescheduleAppointment(appointmentId, update) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .update(update)
    .catch((err) => alert(err));
}

export function updateAppointmentStatus(appointmentId, status) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .update({ status })
    .catch((err) => alert(err));
}

export function cancelAppointmentById(appointmentId) {
  return db
    .collection("schedule")
    .doc(appointmentId)
    .delete()
    .then((res) => console.log(res))
    .catch((err) => alert(err));
}

export function updateAppointmentUpgrades(appointmentId, upgrades) {
  db.collection("schedule")
    .doc(appointmentId)
    .update({
      upgrades,
    })
    .catch((err) => alert(err));
}

// Upgrades Specific
export function getUpgrades() {
  return db
    .collection("upgrades")
    .get()
    .then((querySnap) =>
      querySnap.docs.map(function (doc) {
        const obj = doc.data();
        obj.id = doc.id;
        return obj;
      })
    )
    .catch((err) => alert(err));
}

export function addNewUpgrade(upgrade) {
  return db
    .collection("upgrades")
    .add(upgrade)
    .catch((err) => alert(err));
}

export function removeUpgrade(serviceId) {
  return db
    .collection("upgrades")
    .doc(serviceId)
    .delete()
    .catch((err) => alert(err));
}

export function getServices() {
  return db
    .collection("services")
    .get()
    .then((querySnap) =>
      querySnap.docs.map(function (doc) {
        const obj = doc.data();
        obj.id = doc.id;
        return obj;
      })
    )
    .catch((err) => alert(err));
}

export function getServicesByType(type) {
  return db
    .collection("services")
    .where("type", "==", type)
    .get()
    .then((snap) =>
      snap.docs.map(function (doc) {
        const obj = doc.data();
        obj.id = doc.id;
        return obj;
      })
    )
    .catch((err) => alert(err));
}

export function addNewService(service) {
  return db
    .collection("services")
    .add(service)
    .then((res) => console.log(res))
    .catch((err) => alert(err));
}

export function removeService(serviceId) {
  return db
    .collection("services")
    .doc(serviceId)
    .delete()
    .catch((err) => alert(err));
}

export function getEmployees() {
  return db
    .collection("users")
    .where("role", "==", "employee")
    .get()
    .then((snap) =>
      snap.docs.map((item) => {
        const obj = item.data();
        obj.id = item.id;
        return obj;
      })
    )
    .catch((err) => alert(err));
}
