export default class Appointment {
  constructor(data) {
    this.id = data.id;
    this.address = data.address;
    this.charge = data.charge;
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
    this.userId = data.userId;
    this.userVehicle = data.userVehicle;
  }
}
