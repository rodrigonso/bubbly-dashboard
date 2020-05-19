export default class User {
  constructor(data) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.name = `${data.firstName} ${data.lastName}`;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address
      ? `${data.address.street}, ${data.address.city}, ${data.address.state}`
      : "N/A";
    this.vehicles = data?.vehicles ?? [];
    this.sources = data?.sources ?? [];
  }
}
