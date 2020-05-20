import User from "./User";

export default class Employee extends User {
  constructor(data) {
    super(data);
    this.rating = data.rating;
    this.schedule = data.schedule;
  }
}
