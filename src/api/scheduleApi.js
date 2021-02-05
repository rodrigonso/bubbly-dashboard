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
      const res = await Axios.post(
        `${this.baseurl}/${this.endpoint}/cancelAppointment`,
        data
      );
      console.log(res);
      const parsed = this.parseResponse(res);
      console.log(parsed);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  static newBlockedTime = async (data) => {
    try {
      await firebase.firestore().collection("schedule").doc(data.id).set(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  static cancelBlockedTime = async (blockedTimeId) => {
    try {
      await firebase
        .firestore()
        .collection("schedule")
        .doc(blockedTimeId)
        .delete();
    } catch (error) {
      console.log(error);
    }
  };

  static listenToActiveAppointmentsToday = (onAppointmentUpdate) => {
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

  static listenToAppointmentsToday = (onAppointmentUpdate) => {
    const start = moment().startOf("day").unix();
    const end = moment().endOf("day").unix();
    return firebase
      .firestore()
      .collection("schedule")
      .where("startTime", ">=", start)
      .where("startTime", "<=", end)
      .orderBy("startTime")
      .onSnapshot((snap) => {
        const appts = snap.docs.map((doc) => new Appointment(doc.data()));
        const filtered = appts.filter((i) => i.status !== "BLOCKED_TIME");
        return onAppointmentUpdate(filtered);
      });
  };

  static getActiveAppointments = async () => {
    try {
      const response = await Axios.get(
        `${this.baseurl}/${this.endpoint}/getActiveAppointments`
      );
      const parsed = this.parseResponse(response);
      if (parsed.length > 0) return parsed.map((item) => new Appointment(item));
      return [];
    } catch (error) {
      console.error(error);
    }
  };
}
