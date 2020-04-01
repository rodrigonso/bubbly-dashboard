import Service from "./service";
import Vehicle from "./vehicle";
import Address from "./address";
import Upgrade from "./upgrade";

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
    this.service = new Service(data.service);
    this.vehicle = new Vehicle(data.userVehicle);
    this.address = new Address(data.address);
    this.upgrades = data.upgrades.map(data => new Upgrade(data));
  }
}
