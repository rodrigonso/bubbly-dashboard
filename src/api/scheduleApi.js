import Axios from "axios";
import { Api } from "./api";

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
}
