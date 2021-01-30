import { Api } from "./api";
import firebase from "../config/firebase";
import axios from "axios";

export class EmployeeApi extends Api {
  static endpoint = "employeeApi";

  static listenToDetailerPositionById(employeeId, onPositionChanged) {
    return firebase
      .firestore()
      .collection("locations")
      .doc(employeeId)
      .onSnapshot((doc) => {
        onPositionChanged({ employeeId: doc.id, coords: doc.data() });
      });
  }

  static listenToDetailersPositions(onPositionChanged) {
    return firebase
      .firestore()
      .collection("locations")
      .onSnapshot((snap) =>
        onPositionChanged(
          snap.docs.map((doc) => ({ employeeId: doc.id, coords: doc.data() }))
        )
      );
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
