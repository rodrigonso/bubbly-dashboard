export class Api {
  static baseurl = process.env.REACT_APP_API_BASE_URL;

  static parseResponse = (response) => {
    const { data } = response;

    if (data.hasOwnProperty("error")) {
      throw new Error(data["error"]);
    }

    return data.data;
  };
}
