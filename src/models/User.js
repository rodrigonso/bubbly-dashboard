export default class User {
  constructor(data) {
    this.id = data?.id;
    this.photoUrl = data?.photoUrl ?? "";
    this.pushToken = data?.pushToken;
    this.firstName = data?.firstName;
    this.lastName = data?.lastName;
    this.email = data?.email;
    this.phone = (data.phone === "" ? "N/A" : data.phone) ?? "N/A";
    this.role = data.role;
  }

  static toObj = (user) => {
    const obj = Object.assign({}, user);
    delete obj.formatName;
    return obj;
  };

  toString = () => {
    return `${this.firstName} ${this.lastName}`;
  };
}
