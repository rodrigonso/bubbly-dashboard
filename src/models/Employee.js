import User from "./User";

export default class Employee extends User {
  constructor(data) {
    super(data);
    this.rating = data.rating;
  }

  static toObj = (employee) => {
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      rating: employee.rating,
    };
  };
}
