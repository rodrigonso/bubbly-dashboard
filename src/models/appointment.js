export default class Appointment {
  constructor(id, data) {
    this.id = id;
    this.date = data.date;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.subtotal = data.subtotal;
    this.total = data.total;
    this.tip = data.tip;
    this.userId = data.userId;
    this.status = data.status;
    this.service = data.service;
    this.vehicle = data.userVehicle;
    this.address = data.address;
    this.upgrades = data.upgrades;
  }
}
