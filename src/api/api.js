export class Api {
  static baseurl =
    // "https://us-central1-bubbly-app-6ff08.cloudfunctions.net/api/";
    "http://localhost:5000/bubbly-app-6ff08/us-central1/api/";

  static parseResponse = (response) => {
    const { data } = response;

    if (data.hasOwnProperty("error")) {
      throw new Error(data["error"]);
    }

    return data.data;
  };
}
