import Customer from "./Customer";
import Address from "./Address";
import moment from "moment";

export default class Appointment {
  constructor(data) {
    this.id = data.id;
    this.employeeId = data.employeeId;
    this.employee = data?.employee ?? null;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
    this.customer = new Customer(data.customer);
    this.address = new Address(data.address);
    this.date = moment.unix(data.date);
    this.duration = data.duration;
    this.startTime = moment.unix(data.startTime);
    this.endTime = moment.unix(data.endTime);
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
    const currentTime = moment();
    let calculatedStatus = status;

    if (status === "DRIVING" || status === "CONFIRMED") {
      if (currentTime.isAfter(startTime)) {
        calculatedStatus = "DELAYED";
      }

      if (
        currentTime.isAfter(startTime.clone().add(moment.duration(15, "m")))
      ) {
        calculatedStatus = "LATE";
      }
    }

    if (status === "WASHING") {
      if (currentTime.isAfter(endTime)) {
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
    return moment(date).unix();
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
