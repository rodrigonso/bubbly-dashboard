export default class Address {
  constructor(data) {
    this.id = data.id;
    this.street = data?.street ?? "";
    this.coords = data?.coords ?? {};
    this.icon = data?.icon ?? "";
    this.state = data?.state ?? "";
    this.zipCode = data?.zipCode ?? "";
    this.city = data?.city ?? "";
  }

  toObj = () => {
    const { id, street, city, coords, icon, state, zipCode } = this;
    return {
      id,
      street,
      coords,
      icon,
      state,
      zipCode,
      city,
    };
  };

  toString = () => {
    return `${this.street}, ${this.city}, ${this.state}`;
  };
}
