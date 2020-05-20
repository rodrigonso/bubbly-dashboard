import firebase from "../config/firebase";
var functions = firebase.functions();

export async function createNewEmployee(employee) {
  const func = functions.httpsCallable("createNewEmployee");
  await func(employee);
}
