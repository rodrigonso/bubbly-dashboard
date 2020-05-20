export default class Customer {
  constructor(data) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone ?? "N/A";
    this.addresses = data.addresses;
    this.vehicles = data?.vehicles ?? [];
    this.sources = data?.sources ?? [];
  }

  nameToString = () => {
    return `${this.firstName} ${this.lastName}`;
  };
}
