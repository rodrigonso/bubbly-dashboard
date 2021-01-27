import User from "./User";

export default class Employee extends User {
  constructor(data) {
    super(data);
    this.ratings = data.ratings;
    this.schedule = data.schedule;
  }

  static toObj = (employee) => {
    const obj = Object.assign({}, employee);
    return obj;
  };

  static toCompactObj = (employee) => {
    const obj = Object.assign({}, employee);
    delete obj.ratings;
    delete obj.schedule;
    return obj;
  };
}
