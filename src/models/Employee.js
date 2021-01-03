import User from "./User";

export default class Employee extends User {
  constructor(data) {
    super(data);
    this.ratings = data.ratings;
  }

  static toObj = (employee) => {
    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      ratings: employee.ratings,
    };
  };
}
