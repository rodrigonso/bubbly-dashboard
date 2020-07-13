import User from "./User";

export default class Employee extends User {
  constructor(data) {
    super(data);
    this.ratings = data.ratings;
    this.emploeeId = data.employeeId;
  }

  static toObj = (employee) => {
    return {
      employeeId: employee.emploeeId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      ratings: employee.ratings,
    };
  };
}
