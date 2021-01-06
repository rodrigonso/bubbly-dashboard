export default class Address {
  constructor(id, data) {
    this.id = id;
    this.street = data?.street ?? "";
    this.coords = data?.coords ?? {};
    this.icon = data?.icon ?? "";
    this.state = data?.state ?? "";
    this.zipCode = data?.zipCode ?? "";
    this.city = data?.city ?? "";
  }

  toObj = () => {
    const obj = Object.assign({}, this);
    delete obj.toString;
    return obj;
  };

  toString = () => {
    return `${this.street}, ${this.city}, ${this.state}`;
  };
}
