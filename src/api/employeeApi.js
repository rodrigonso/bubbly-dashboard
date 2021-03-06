import { Api } from "./api";
import firebase from "../config/firebase";
import axios from "axios";
import Employee from "../models/Employee";

export class EmployeeApi extends Api {
  static endpoint = "employeeApi";

  static async getEmployeeById(employeeId) {
    return await firebase
      .firestore()
      .collection("users")
      .doc(employeeId)
      .get()
      .then((doc) => new Employee(doc.data()));
  }

  static listenToDetailerPositionById(employeeId, onPositionChanged) {
    const ref = firebase.database().ref(`/geopositions/${employeeId}`);
    ref.on("value", (snap) => onPositionChanged(snap.val()));
    return ref;
  }

  static listenToDetailersPositions(onPositionChanged) {
    const ref = firebase.database().ref("/geopositions");
    ref.on("value", (snap) => onPositionChanged(snap.val()));
    return ref;
  }

  static async createNewEmployee(data) {
    try {
      const res = await axios.post(
        `${this.baseurl}/${this.endpoint}/createNewEmployee`,
        data
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateEmployee(employeeId, data) {
    try {
      const res = await axios.put(
        `${this.baseurl}/${this.endpoint}/updateEmployee/${employeeId}`,
        data
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
