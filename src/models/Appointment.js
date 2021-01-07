import Customer from "./Customer";
import Address from "./Address";

export default class Appointment {
  constructor(data, id) {
    this.id = id;
    this.employeeId = data.employeeId;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
    this.customer = new Customer(data.customer);
    this.address = new Address(data.address);
    this.date = new Date(data.date * 1000);
    this.duration = data.duration;
    this.startTime = new Date(data.startTime * 1000);
    this.endTime = new Date(data.endTime * 1000);
    this.notes = data.notes;
    this.service = data.service;
    this.status = data.status;
    this.subtotal = data?.subtotal ?? 0;
    this.tip = data?.tip ?? 0;
    this.total = data?.total ?? 0;
    this.upgrades = data.upgrades;
    this.vehicle = data.vehicle;
  }

  calculateStatus = () => {
    const { status, startTime, endTime } = this;
    const currentTime = new Date();
    let calculatedStatus = status;

    if (status === "DRIVING" || status === "CONFIRMED") {
      if (currentTime > startTime) {
        calculatedStatus = "LATE";
      }
    }

    if (status === "WASHING") {
      if (currentTime > endTime) {
        calculatedStatus = "LATE";
      }
    }

    return calculatedStatus;
  };

  static calculateTotal = (appointment) => {
    const { service, tip, upgrades } = appointment;
    let total = 0;
    let subtotal = service.price;
    total += subtotal;
    total += tip;
    upgrades.forEach((i) => (total += i.price));

    return total;
  };

  static formatDate = (date) => {
    return new Date(date).getTime() / 1000;
  };

  static toObject = (appointment) => {
    const obj = Object.assign({}, appointment);

    obj.startTime = Appointment.formatDate(obj.startTime);
    obj.endTime = Appointment.formatDate(obj.endTime);
    obj.date = Appointment.formatDate(obj.date);
    obj.customer = Customer.toObject(obj.customer);
    obj.address = Address.toObject(obj.address);
    obj.total = Appointment.calculateTotal(obj);
    delete obj.calculateStatus;
    return obj;
  };
}
