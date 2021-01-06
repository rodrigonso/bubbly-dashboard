
import Customer from "./Customer";
import Address from "./Address";

export default class Appointment {
  constructor(data, id) {
    this.id = id;
    this.active = data.active;
    this.paymentStatus = data.paymentStatus;
    this.customer = new Customer(data.customer);
    this.address = new Address("", data.address);
    this.date = new Date(data.date * 1000);
    this.duration = data.duration;
    this.startTime = new Date(data.startTime * 1000);
    this.endTime = new Date(data.endTime * 1000);
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