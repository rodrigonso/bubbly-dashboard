export default class Address {
  constructor(id, data) {
    this.id = id;
    this.street = data.street;
    this.coords = data.coords;
    this.icon = data.icon;
    this.state = data.state;
    this.zipCode = data.zipCode;
    this.city = data.city;
  }

  toObj = () => {
    return {
      id: this.id,
      street: this.street,
      coords: this.coords,
      icon: this.icon,
      state: this.state,
      zipCode: this.zipCode,
      city: this.city,
    };
  };

  toString = () => {
    return `${this.street}, ${this.city}, ${this.state}`;
  };
}
