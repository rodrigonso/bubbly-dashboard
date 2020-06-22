import firebase from "../config/firebase";
var functions = firebase.functions();

export async function createNewEmployee(employee) {
  const func = functions.httpsCallable("createNewEmployee");
  await func(employee);
}

export async function cancelAppoitment(data) {
  const func = functions.httpsCallable("cancelAppointment");
  await func({ data });
}
