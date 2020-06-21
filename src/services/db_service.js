import moment from "moment";
import firebase from "../config/firebase";
import Customer from "../models/Customer";
import Address from "../models/Address";
import Appointment from "../models/Appointment";
import Employee from "../models/Employee";

const db = firebase.firestore();

// Helper Functions
function getFirstAndLastDay(date) {
  const test = new Date(date);
  const dt = moment(test),
    y = date.getFullYear(),
    m = date.getMonth();

  const firstDay = new Date(y, m, 1).toISOString();
  const lastDay = new Date(y, m + 1, 0).toISOString();

  return [firstDay, lastDay];
}

// CUSTOMERS
async function getAllCustomerData(userSnap) {
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

export async function getCustomers() {
  const customerRef = await db
    .collection("users")
    .where("role", "==", "customer")
    .get();

  const promises = customerRef.docs.map(async (customerSnap) => {
    const customer = customerSnap.data();
    customer.id = customerSnap.id;
    const { sources, addresses, vehicles } = await getAllCustomerData(
      customerSnap
    );
    customer.addresses = addresses;
    customer.vehicles = vehicles;
    customer.sources = sources;
    return new Customer(customer);
  });

  return await Promise.all(promises);
}

export async function updateCustomerDetailsWithId(userId, update) {
  return db
    .collection("users")
    .doc(userId)
    .update(update)
    .catch((err) => alert(err));
}

export async function deleteUserById(userId) {
  return db
    .collection("users")
    .doc(userId)
    .delete()
    .catch((err) => alert(err));
}

// APPOINTMENTS
export function getAppointments(date) {
  console.log(date);
  const [firstDay, lastDay] = getFirstAndLastDay(date);
  console.log(new Date(firstDay).getTime() / 1000);
  console.log(new Date(date).getTime() / 1000);
  console.log(new Date(lastDay).getTime() / 1000);
  return db
    .collection("schedule")
    .where("startTime", ">=", new Date(firstDay).getTime() / 1000)
    .where("startTime", "<=", new Date(lastDay).getTime() / 1000)
    .orderBy("startTime", "asc")
    .get()
    .then((querySnap) => {
      console.log("LENGTH OF QUERY", querySnap.docs.length);
      return querySnap.docs.map((doc) => {
        return new Appointment(doc.data(), doc.id);
      });
    })
    .catch((err) => console.error(err));
}

export function getAppointmentsToday() {
  let dt1 = new Date();
  let dt2 = new Date();

  dt1.setHours(1, 0, 0);
  dt2.setHours(23, 59, 59);

  console.log(dt1, dt2);

  const startOfDay = dt1.getTime() / 1000;
  const endOfDay = dt2.getTime() / 1000;

  return db
    .collection("schedule")
    .where("date", ">=", startOfDay)
    .where("date", "<=", endOfDay)
    .get()
    .then((snap) =>
      snap.docs.map((item) => new Appointment(item.data(), item.id))
    );
}

export function getActiveAppointments() {
  return db
    .collection("schedule")
    .where("active", "==", true)
    .get()
    .then((snap) =>
      snap.docs.map((doc) => new Appointment(doc.data(), doc.id))
    );
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
      return new Appointment(snap.data(), snap.id);
    })
    .catch((err) => alert(err));
}

export function rescheduleAppointmentById(appointmentId, update) {
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
    .update(status)
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

// UPGRADES
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

// SERVICES
async function getAllServiceData(serviceSnap) {
  const upgrades = await serviceSnap.ref
    .collection("upgrades")
    .get()
    .then((snap) => snap.docs.map((item) => item.data()));
  return { upgrades };
}

export async function getServices() {
  const servicesRef = await db.collection("services").get();

  const promises = servicesRef.docs.map(async (serviceSnap) => {
    const service = serviceSnap.data();
    service.id = serviceSnap.id;
    const { upgrades } = await getAllServiceData(serviceSnap);

    service.upgrades = upgrades;
    return service;
  });

  return await Promise.all(promises);
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

// const servicesRef = await db.collection("services").get();

// const promises = servicesRef.docs.map(async (serviceSnap) => {
//   const service = serviceSnap.data();
//   service.id = serviceSnap.id;
//   const { upgrades } = await getAllServiceData(serviceSnap);

//   service.upgrades = upgrades;
//   return service;
// });

// return await Promise.all(promises);

export async function addNewService(service) {
  let upgrades = service.upgrades;
  delete service.upgrades;
  db.collection("services")
    .add(service)
    .then((docRef) => {
      return upgrades.map((item) => docRef.collection("upgrades").add(item));
    });
}

export function removeService(serviceId) {
  return db
    .collection("services")
    .doc(serviceId)
    .delete()
    .catch((err) => alert(err));
}

// EMPLOYEES
export async function getEmployees() {
  var ref = await db.collection("users");
  var managers = await ref
    .where("role", "==", "manager")
    .get()
    .then((snap) =>
      snap.docs.map((item) => {
        const obj = item.data();
        obj.id = item.id;
        return new Employee(obj);
      })
    )
    .catch((err) => alert(err));
  var detailers = await ref
    .where("role", "==", "detailer")
    .get()
    .then((snap) =>
      snap.docs.map((item) => {
        const obj = item.data();
        obj.id = item.id;
        return new Employee(obj);
      })
    )
    .catch((err) => alert(err));

  return managers.concat(detailers);
}

export async function getDetailers() {
  return await db
    .collection("users")
    .where("role", "==", "detailer")
    .get()
    .then((snap) =>
      snap.docs.map((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        return new Employee(obj);
      })
    );
}

export async function updateEmployeeDetailsWithId(employeeId, update) {
  return db
    .collection("users")
    .doc(employeeId)
    .update(update)
    .catch((err) => alert(err));
}
