import Customer from "./Customer";
import Address from "./Address";

export default class Appointment {
  constructor(data, id) {
    this.id = id;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
    this.customer = new Customer(data.customer);
    this.address = new Address("", data.address);
    this.date = data.date;
    this.duration = data.duration;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.notes = data.notes;
    this.service = data.service;
    this.status = data.status;
    this.subtotal = data.subtotal;
    this.tip = data.tip;
    this.total = data.total;
    this.upgrades = data.upgrades;
    this.vehicle = data.vehicle;
  }
}
