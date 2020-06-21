export default class User {
  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = (data.phone === "" ? "N/A" : data.phone) ?? "N/A";
    this.role = data.role;
  }

  formatName = () => {
    return `${this.firstName} ${this.lastName}`;
  };
}
