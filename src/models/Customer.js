import User from "./User";
import Address from "./Address";

export default class Customer extends User {
  constructor(data) {
    super(data);
    this.customerId = data.customerId;
    this.addresses =
      data?.addresses?.map((item) => new Address(item.id, item)) ?? null;

    this.vehicles = data?.vehicles ?? [];
    this.sources = data?.sources ?? [];
  }

  static toCompactObj(customer) {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      role: customer.role,
      customerId: customer.customerId,
    };
  }

  toString() {
    return `${this.firstName} ${this.lastName}`;
  }
}