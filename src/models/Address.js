export default class Address {
  constructor(data) {
    this.id = data?.id;
    this.street = data?.street ?? "";
    this.coords = data?.coords ?? {};
    this.icon = data?.icon ?? "";
    this.state = data?.state ?? "";
    this.zipCode = data?.zipCode ?? "";
    this.city = data?.city ?? "";
  }

  static toObject = (address) => {
    const obj = Object.assign({}, address);
    delete obj.toString;
    return obj;
  };

  toString = () => {
    return `${this.street}, ${this.city}, ${this.state}`;
  };
}
