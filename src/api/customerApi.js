import Axios from "axios";
import Address from "../models/Address";
import { Api } from "./api";

export class CustomerApi extends Api {
  static endpoint = "customerApi";

  static getCustomerVehicles = async (userId) => {
    try {
      const response = await Axios.get(
        `${this.baseurl}/${this.endpoint}/getResources/${userId}?resources=vehicles`
      );

      const parsed = this.parseResponse(response);
      if (parsed.vehicles) {
        return parsed.vehicles;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  };

  static getCustomerAddresses = async (userId) => {
    try {
      const response = await Axios.get(
        `${this.baseurl}/${this.endpoint}/getResources/${userId}?resources=addresses`
      );

      const parsed = this.parseResponse(response);
      if (parsed.addresses) {
        return parsed.addresses.map((item) => new Address(item));
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  };
}
