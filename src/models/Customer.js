import User from "./User";
import Address from "./Address";

export default class Customer extends User {
  constructor(data) {
    super(data);
    this.customerId = data?.customerId;
    this.addresses = data?.addresses?.map((item) => new Address(item)) ?? [];
    this.vehicles = data?.vehicles ?? [];
    this.sources = data?.sources ?? [];
  }

  static toObject(customer) {
    const obj = Object.assign({}, customer);
    obj.addresses = obj.addresses.map((i) => Address.toObject(i));

    delete obj.toString;

    return obj;
  }

  static toCompactObj(customer) {
    const obj = Object.assign({}, customer);
    delete obj.addresses;
    delete obj.vehicles;
    delete obj.sources;

    delete obj.toString;

    return obj;
  }

  toString() {
    return `${this.firstName} ${this.lastName}`;
  }
}
