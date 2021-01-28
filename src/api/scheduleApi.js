import Axios from "axios";
import Appointment from "../models/Appointment";
import { Api } from "./api";
import firebase from "../config/firebase";
import moment from "moment";

export class ScheduleApi extends Api {
  static endpoint = "scheduleApi";

  static bookNewAppointment = async (data) => {
    try {
      console.log(`${this.baseurl}/${this.endpoint}`);
      await Axios.post(
        `${this.baseurl}/${this.endpoint}/bookNewAppointment`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  static cancelAppointment = async (data) => {
    try {
      console.log(data);
      await Axios.post(
        `${this.baseurl}/${this.endpoint}/cancelAppointment`,
        data
      );
    } catch (error) {
      console.error(error);
    }
  };

  static listenToAppointmentsToday = (onAppointmentUpdate) => {
    const start = moment().startOf("day").unix();
    const end = moment().endOf("day").unix();
    return firebase
      .firestore()
      .collection("schedule")
      .where("active", "==", true)
      .where("date", ">=", start)
      .where("date", "<=", end)
      .onSnapshot((snap) => {
        return onAppointmentUpdate(
          snap.docs.map((doc) => new Appointment(doc.data()))
        );
      });
  };

  static getActiveAppointments = async () => {
    try {
      const response = await Axios.get(
        `${this.baseurl}/${this.endpoint}/getActiveAppointments`
      );
      const parsed = this.parseResponse(response);
      if (parsed.length > 0) return parsed.map((item) => new Appointment(item));
      else return [];
    } catch (error) {
      console.error(error);
    }
  };
}
