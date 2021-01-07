import firebase from "../config/firebase";
import Customer from "../models/Customer";
import Address from "../models/Address";
import Appointment from "../models/Appointment";
import Employee from "../models/Employee";

import { message } from "antd";

const db = firebase.firestore();

// Helper Functions
function getFirstAndLastDay(date) {
  const dt = new Date(date);
  let y = dt.getUTCFullYear();
  let m = dt.getUTCMonth();

  const firstDay = new Date(y, m, 1, 1).toISOString();
  const lastDay = new Date(y, m + 1, 0, 23).toISOString();

  console.log(firstDay);
  console.log(lastDay);

  return [firstDay, lastDay];
}

// CUSTOMERS
export async function getCustomerById(customerId) {
  const customerSnap = await db.collection("users").doc(customerId).get();
  const { sources, addresses, vehicles } = await getAllCustomerData(
    customerSnap
  );
  const customer = customerSnap.data();
  customer.sources = sources;
  customer.addresses = addresses;
  customer.vehicles = vehicles;

  return new Customer(customer);
}

async function getAllCustomerData(userSnap) {
  const sources = await userSnap.ref
    .collection("sources")
    .get()
    .then((snap) => snap.docs.map((item) => item.data()));
  const addresses = await userSnap.ref
    .collection("addresses")
    .get()
    .then((snap) => snap.docs.map((doc) => new Address(doc.data())));
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
  const [firstDay, lastDay] = getFirstAndLastDay(date);
  return db
    .collection("schedule")
    .where("startTime", ">=", new Date(firstDay).getTime() / 1000)
    .where("startTime", "<=", new Date(lastDay).getTime() / 1000)
    .orderBy("startTime", "asc")
    .get()
    .then((querySnap) => {
      return querySnap.docs.map((doc) => {
        return new Appointment(doc.data(), doc.id);
      });
    })
    .catch((err) => console.error(err));
}

export function getAppointmentsToday() {
  let dt1 = new Date();
  let dt2 = new Date();

  dt1.setHours(0, 0, 0, 0, 0);
  dt2.setHours(23, 59, 59, 59, 59);

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

export async function getCustomerAppointmentsById(customerId) {
  return db
    .collection("schedule")
    .where("customer.id", "==", customerId)
    .orderBy("startTime", "desc")
    .get()
    .then((querySnap) =>
      querySnap.docs.map((doc) => new Appointment(doc.data(), doc.id))
    )
    .catch((err) => console.error(err));
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

export function updateAppointmentById(appointmentId, update) {
  console.log(appointmentId);
  console.log(update);
  return db
    .collection("schedule")
    .doc(appointmentId)
    .update(update)
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

export async function getServiceById(serviceId) {
  return db
    .collection("services")
    .doc(serviceId)
    .get()
    .then((doc) => {
      const service = doc.data();
      service.id = doc.id;
      return service;
    })
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

export function streamEmployeeLocation(employeeId) {
  return db.collection("locations").doc(employeeId);
}

export async function addNewService(service) {
  let upgrades = service.upgrades;
  delete service.upgrades;
  console.log(service);
  db.collection("services")
    .add(service)
    .then((docRef) => {
      return upgrades.map((item) => docRef.collection("upgrades").add(item));
    });
}

export async function updateService(serviceId, data) {
  return db
    .collection("services")
    .doc(serviceId)
    .update(data)
    .finally(() => message.success("Service updated with success!"))
    .catch((err) => message.error(`Could not update service: ${err}`));
}

export function removeServiceById(serviceId) {
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

export async function getEmployeeById(employeeId) {
  return db
    .collection("users")
    .doc(employeeId)
    .get()
    .then((snap) => new Employee(snap.data()))
    .catch((err) => alert(err));
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
